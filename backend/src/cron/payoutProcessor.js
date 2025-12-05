const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const { eventBus, EventTypes } = require('../services/eventBus');

const prisma = new PrismaClient();

const BATCH_SIZE = 10;
const MAX_RETRY_ATTEMPTS = 3;

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * Process pending payouts
 * - Runs daily at 10 AM
 * - Processes payouts that have passed their scheduled time
 * - Batch processing to avoid overwhelming the payment gateway
 */
async function processPayouts() {
    const now = new Date();

    // Find eligible payouts
    const pendingPayouts = await prisma.payout.findMany({
        where: {
            status: 'PENDING',
            scheduledFor: {
                lte: now
            },
            retryCount: {
                lt: MAX_RETRY_ATTEMPTS
            }
        },
        include: {
            job: {
                include: {
                    campaign: {
                        select: { title: true }
                    }
                }
            }
        },
        take: BATCH_SIZE,
        orderBy: { scheduledFor: 'asc' }
    });

    console.log(`[PayoutProcessor] Processing ${pendingPayouts.length} payouts`);

    for (const payout of pendingPayouts) {
        try {
            await processSinglePayout(payout);
        } catch (error) {
            console.error(`[PayoutProcessor] Error processing payout ${payout.id}:`, error);
            await handlePayoutError(payout, error);
        }
    }
}

/**
 * Process a single payout
 */
async function processSinglePayout(payout) {
    // Get cleaner's bank details
    const cleanerProfile = await prisma.cleanerProfile.findUnique({
        where: { userId: payout.cleanerId }
    });

    if (!cleanerProfile) {
        throw new Error('Cleaner profile not found');
    }

    if (!cleanerProfile.bankDetailsVerified) {
        throw new Error('Bank details not verified');
    }

    if (!cleanerProfile.razorpayFundAccountId) {
        throw new Error('Razorpay fund account not set up');
    }

    // Update payout status to PROCESSING
    await prisma.payout.update({
        where: { id: payout.id },
        data: {
            status: 'PROCESSING',
            initiatedAt: new Date()
        }
    });

    try {
        // Create Razorpay payout
        const razorpayPayout = await razorpay.payouts.create({
            account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
            fund_account_id: cleanerProfile.razorpayFundAccountId,
            amount: Math.round(payout.amount * 100), // Convert to paise
            currency: 'INR',
            mode: 'IMPS',
            purpose: 'payout',
            queue_if_low_balance: true,
            reference_id: payout.id,
            narration: `Cleanit Job Payment - ${payout.job.campaign.title}`
        });

        // Update payout with Razorpay ID
        await prisma.payout.update({
            where: { id: payout.id },
            data: {
                razorpayPayoutId: razorpayPayout.id
            }
        });

        console.log(`[PayoutProcessor] Payout ${payout.id} initiated via Razorpay: ${razorpayPayout.id}`);

        // Note: Final status update happens via webhook
    } catch (error) {
        // Revert to PENDING for retry
        await prisma.payout.update({
            where: { id: payout.id },
            data: {
                status: 'PENDING',
                retryCount: payout.retryCount + 1,
                failureReason: error.message
            }
        });
        throw error;
    }
}

/**
 * Handle payout errors
 */
async function handlePayoutError(payout, error) {
    const newRetryCount = payout.retryCount + 1;

    await prisma.payout.update({
        where: { id: payout.id },
        data: {
            status: newRetryCount >= MAX_RETRY_ATTEMPTS ? 'FAILED' : 'PENDING',
            retryCount: newRetryCount,
            failureReason: error.message
        }
    });

    if (newRetryCount >= MAX_RETRY_ATTEMPTS) {
        // Emit failure event for admin notification
        eventBus.emitEvent(EventTypes.PAYOUT_FAILED, {
            payoutId: payout.id,
            jobId: payout.jobId,
            cleanerId: payout.cleanerId,
            amount: payout.amount,
            reason: error.message
        });
    }
}

/**
 * Handle Razorpay payout webhook
 * Called from webhook controller
 */
async function handlePayoutWebhook(event, payload) {
    const payoutId = payload.payout?.entity?.reference_id;
    
    if (!payoutId) {
        console.error('[PayoutProcessor] No reference_id in webhook payload');
        return;
    }

    const payout = await prisma.payout.findUnique({
        where: { id: payoutId },
        include: {
            job: {
                include: {
                    campaign: { select: { title: true } }
                }
            }
        }
    });

    if (!payout) {
        console.error(`[PayoutProcessor] Payout not found: ${payoutId}`);
        return;
    }

    if (event === 'payout.processed') {
        // Payout successful
        await prisma.$transaction(async (tx) => {
            await tx.payout.update({
                where: { id: payoutId },
                data: {
                    status: 'PAID',
                    paidAt: new Date()
                }
            });

            await tx.job.update({
                where: { id: payout.jobId },
                data: { status: 'PAID' }
            });

            // Update cleaner profile
            await tx.cleanerProfile.update({
                where: { userId: payout.cleanerId },
                data: {
                    completedJobs: { increment: 1 },
                    totalEarnings: { increment: payout.amount }
                }
            });

            // Release escrow
            const contributions = await tx.contribution.findMany({
                where: {
                    campaignId: payout.job.campaignId,
                    status: 'SUCCESS'
                },
                select: { id: true }
            });

            for (const contribution of contributions) {
                await tx.escrowTransaction.updateMany({
                    where: { contributionId: contribution.id },
                    data: {
                        status: 'RELEASED',
                        releasedAt: new Date(),
                        releasedFor: 'PAYOUT'
                    }
                });
            }
        });

        // Emit success event
        eventBus.emitEvent(EventTypes.PAYOUT_SUCCESS, {
            payoutId: payout.id,
            jobId: payout.jobId,
            cleanerId: payout.cleanerId,
            amount: payout.amount,
            campaignTitle: payout.job.campaign.title
        });

        console.log(`[PayoutProcessor] Payout ${payoutId} completed successfully`);

    } else if (event === 'payout.failed' || event === 'payout.reversed') {
        // Payout failed
        await prisma.payout.update({
            where: { id: payoutId },
            data: {
                status: 'FAILED',
                failureReason: payload.payout?.entity?.failure_reason || 'Unknown error'
            }
        });

        eventBus.emitEvent(EventTypes.PAYOUT_FAILED, {
            payoutId: payout.id,
            jobId: payout.jobId,
            cleanerId: payout.cleanerId,
            amount: payout.amount,
            reason: payload.payout?.entity?.failure_reason
        });

        console.log(`[PayoutProcessor] Payout ${payoutId} failed`);
    }
}

module.exports = {
    processPayouts,
    handlePayoutWebhook
};
