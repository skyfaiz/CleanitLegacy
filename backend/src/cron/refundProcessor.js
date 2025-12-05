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
 * Process pending refunds
 * - Triggered for expired/cancelled campaigns
 * - Batch processing to avoid overwhelming the payment gateway
 */
async function processRefunds() {
    // Find contributions pending refund
    const pendingRefunds = await prisma.contribution.findMany({
        where: {
            refundStatus: 'PENDING',
            status: 'SUCCESS',
            razorpayPaymentId: {
                not: null
            }
        },
        include: {
            campaign: {
                select: { id: true, title: true }
            },
            user: {
                select: { id: true, name: true }
            }
        },
        take: BATCH_SIZE,
        orderBy: { createdAt: 'asc' }
    });

    console.log(`[RefundProcessor] Processing ${pendingRefunds.length} refunds`);

    for (const contribution of pendingRefunds) {
        try {
            await processSingleRefund(contribution);
        } catch (error) {
            console.error(`[RefundProcessor] Error processing refund for contribution ${contribution.id}:`, error);
            await handleRefundError(contribution, error);
        }
    }

    // Update campaign refund status if all refunds processed
    await updateCampaignRefundStatus();
}

/**
 * Process a single refund
 */
async function processSingleRefund(contribution) {
    // Calculate refund amount (full amount for now, can deduct gateway fees if needed)
    const refundAmount = contribution.amount;

    // Update status to PROCESSING
    await prisma.contribution.update({
        where: { id: contribution.id },
        data: {
            refundStatus: 'PROCESSING',
            refundAmount: refundAmount,
            refundInitiatedAt: new Date()
        }
    });

    try {
        // Create Razorpay refund
        const refund = await razorpay.payments.refund(contribution.razorpayPaymentId, {
            amount: Math.round(refundAmount * 100), // Convert to paise
            notes: {
                reason: 'Campaign expired/cancelled',
                campaignId: contribution.campaignId,
                contributionId: contribution.id
            }
        });

        // Update contribution with refund ID
        await prisma.contribution.update({
            where: { id: contribution.id },
            data: {
                razorpayRefundId: refund.id
            }
        });

        console.log(`[RefundProcessor] Refund initiated for contribution ${contribution.id}: ${refund.id}`);

        // Note: Final status update happens via webhook
    } catch (error) {
        // Revert to PENDING for retry
        await prisma.contribution.update({
            where: { id: contribution.id },
            data: {
                refundStatus: 'PENDING'
            }
        });
        throw error;
    }
}

/**
 * Handle refund errors
 */
async function handleRefundError(contribution, error) {
    // For now, mark as FAILED after error
    // In production, implement retry logic with counter
    await prisma.contribution.update({
        where: { id: contribution.id },
        data: {
            refundStatus: 'FAILED'
        }
    });

    console.error(`[RefundProcessor] Refund failed for contribution ${contribution.id}:`, error.message);
}

/**
 * Update campaign refund status when all contributions are processed
 */
async function updateCampaignRefundStatus() {
    // Find campaigns with PROCESSING refund status
    const campaigns = await prisma.campaign.findMany({
        where: {
            refundStatus: 'PROCESSING'
        },
        include: {
            contributions: {
                where: { status: 'SUCCESS' },
                select: { refundStatus: true }
            }
        }
    });

    for (const campaign of campaigns) {
        const allRefunded = campaign.contributions.every(c => c.refundStatus === 'COMPLETED');
        const anyFailed = campaign.contributions.some(c => c.refundStatus === 'FAILED');

        if (allRefunded) {
            await prisma.campaign.update({
                where: { id: campaign.id },
                data: { refundStatus: 'COMPLETED' }
            });
            console.log(`[RefundProcessor] Campaign ${campaign.id} refunds completed`);
        } else if (anyFailed) {
            // Keep as PROCESSING but flag for admin review
            console.log(`[RefundProcessor] Campaign ${campaign.id} has failed refunds, needs review`);
        }
    }
}

/**
 * Handle Razorpay refund webhook
 * Called from webhook controller
 */
async function handleRefundWebhook(event, payload) {
    const paymentId = payload.refund?.entity?.payment_id;
    const refundId = payload.refund?.entity?.id;

    if (!paymentId) {
        console.error('[RefundProcessor] No payment_id in webhook payload');
        return;
    }

    // Find contribution by payment ID
    const contribution = await prisma.contribution.findFirst({
        where: { razorpayPaymentId: paymentId },
        include: {
            campaign: { select: { title: true } },
            user: { select: { id: true } }
        }
    });

    if (!contribution) {
        console.error(`[RefundProcessor] Contribution not found for payment: ${paymentId}`);
        return;
    }

    if (event === 'refund.processed') {
        // Refund successful
        await prisma.$transaction(async (tx) => {
            await tx.contribution.update({
                where: { id: contribution.id },
                data: {
                    refundStatus: 'COMPLETED',
                    refundedAt: new Date(),
                    escrowStatus: 'REFUNDED'
                }
            });

            // Update escrow transaction
            await tx.escrowTransaction.updateMany({
                where: { contributionId: contribution.id },
                data: {
                    status: 'REFUNDED',
                    releasedAt: new Date(),
                    releasedFor: 'REFUND'
                }
            });
        });

        // Emit success event
        eventBus.emitEvent(EventTypes.REFUND_PROCESSED, {
            contributionId: contribution.id,
            userId: contribution.user.id,
            amount: contribution.refundAmount || contribution.amount,
            campaignTitle: contribution.campaign.title
        });

        console.log(`[RefundProcessor] Refund completed for contribution ${contribution.id}`);

    } else if (event === 'refund.failed') {
        // Refund failed
        await prisma.contribution.update({
            where: { id: contribution.id },
            data: {
                refundStatus: 'FAILED'
            }
        });

        console.log(`[RefundProcessor] Refund failed for contribution ${contribution.id}`);
    }
}

/**
 * Manually trigger refunds for a campaign (admin action)
 */
async function initiateRefundsForCampaign(campaignId) {
    await prisma.$transaction(async (tx) => {
        // Update campaign
        await tx.campaign.update({
            where: { id: campaignId },
            data: { refundStatus: 'PROCESSING' }
        });

        // Mark all successful contributions for refund
        await tx.contribution.updateMany({
            where: {
                campaignId,
                status: 'SUCCESS',
                refundStatus: null
            },
            data: {
                refundStatus: 'PENDING'
            }
        });
    });

    console.log(`[RefundProcessor] Refunds initiated for campaign ${campaignId}`);
}

module.exports = {
    processRefunds,
    handleRefundWebhook,
    initiateRefundsForCampaign
};
