const Razorpay = require('razorpay');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { eventBus, EventTypes } = require('./eventBus');

const prisma = new PrismaClient();

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn('⚠️  Warning: Razorpay credentials not configured. Payment features will not work.');
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'missing_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'missing_secret'
});

class PaymentService {
    /**
     * Create a Razorpay order for contribution
     */
    async createOrder(amount, campaignId, userId) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.');
        }

        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: {
                campaignId,
                userId
            }
        };

        try {
            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            console.error('Razorpay error:', error);
            throw new Error(`Payment order creation failed: ${error.message || error.error?.description || 'Unknown error'}`);
        }
    }

    /**
     * Verify Razorpay payment signature
     */
    verifyPaymentSignature(orderId, paymentId, signature) {
        const body = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        return expectedSignature === signature;
    }

    /**
     * Verify webhook signature
     */
    verifyWebhookSignature(body, signature) {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.warn('Webhook secret not configured');
            return false;
        }

        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(body))
            .digest('hex');

        return expectedSignature === signature;
    }

    /**
     * Process successful payment and create escrow record
     */
    async processSuccessfulPayment(contributionId, razorpayPaymentId) {
        const contribution = await prisma.contribution.findUnique({
            where: { id: contributionId },
            include: {
                campaign: {
                    include: {
                        creator: { select: { id: true, name: true } },
                        contributions: {
                            where: { status: 'SUCCESS' },
                            select: { userId: true }
                        }
                    }
                },
                user: { select: { id: true, name: true } }
            }
        });

        if (!contribution) {
            throw new Error('Contribution not found');
        }

        await prisma.$transaction(async (tx) => {
            // Update contribution status
            await tx.contribution.update({
                where: { id: contributionId },
                data: {
                    status: 'SUCCESS',
                    razorpayPaymentId,
                    escrowStatus: 'HELD'
                }
            });

            // Create escrow transaction
            await tx.escrowTransaction.create({
                data: {
                    contributionId,
                    amount: contribution.amount,
                    status: 'HELD',
                    heldAt: new Date()
                }
            });

            // Update campaign amount raised
            const updatedCampaign = await tx.campaign.update({
                where: { id: contribution.campaignId },
                data: {
                    amountRaised: { increment: contribution.amount }
                }
            });

            // Check if campaign is now fully funded
            if (updatedCampaign.amountRaised >= updatedCampaign.targetAmount) {
                // Update campaign status to FUNDED
                await tx.campaign.update({
                    where: { id: contribution.campaignId },
                    data: { status: 'FUNDED' }
                });

                // Create job
                const jobAmount = updatedCampaign.targetAmount * 0.95;
                const platformFee = updatedCampaign.targetAmount * 0.05;

                await tx.job.create({
                    data: {
                        campaignId: contribution.campaignId,
                        status: 'AVAILABLE',
                        amount: jobAmount,
                        platformFee: platformFee,
                        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
                    }
                });

                // Get all contributor IDs for notification
                const contributorIds = [...new Set(
                    contribution.campaign.contributions.map(c => c.userId)
                )];

                // Emit campaign funded event
                eventBus.emitEvent(EventTypes.CAMPAIGN_FUNDED, {
                    campaignId: contribution.campaignId,
                    creatorId: contribution.campaign.creatorId,
                    campaignTitle: contribution.campaign.title,
                    targetAmount: updatedCampaign.targetAmount,
                    contributorIds
                });
            }
        });

        // Emit contribution event
        eventBus.emitEvent(EventTypes.CAMPAIGN_CONTRIBUTION, {
            campaignId: contribution.campaignId,
            creatorId: contribution.campaign.creatorId,
            campaignTitle: contribution.campaign.title,
            contributorName: contribution.user.name,
            amount: contribution.amount
        });

        return contribution;
    }

    /**
     * Create payout for cleaner
     */
    async createPayout(cleanerId, amount, accountDetails) {
        try {
            // Create contact
            const contact = await razorpay.contacts.create({
                name: accountDetails.name,
                email: accountDetails.email,
                contact: accountDetails.phone,
                type: 'employee',
                reference_id: cleanerId
            });

            // Create fund account
            const fundAccount = await razorpay.fundAccount.create({
                contact_id: contact.id,
                account_type: 'bank_account',
                bank_account: {
                    name: accountDetails.accountName,
                    ifsc: accountDetails.ifsc,
                    account_number: accountDetails.accountNumber
                }
            });

            // Create payout
            const payout = await razorpay.payouts.create({
                account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
                fund_account_id: fundAccount.id,
                amount: Math.round(amount * 100),
                currency: 'INR',
                mode: 'IMPS',
                purpose: 'payout',
                queue_if_low_balance: true,
                reference_id: `job_${Date.now()}`,
                narration: 'Cleanit job payout'
            });

            return payout;
        } catch (error) {
            throw new Error(`Payout failed: ${error.message}`);
        }
    }

    /**
     * Create refund for contribution
     */
    async createRefund(contributionId) {
        const contribution = await prisma.contribution.findUnique({
            where: { id: contributionId },
            include: {
                campaign: { select: { title: true } }
            }
        });

        if (!contribution || !contribution.razorpayPaymentId) {
            throw new Error('Contribution or payment ID not found');
        }

        try {
            const refund = await razorpay.payments.refund(contribution.razorpayPaymentId, {
                amount: Math.round(contribution.amount * 100),
                notes: {
                    reason: 'Campaign expired/cancelled',
                    campaignId: contribution.campaignId,
                    contributionId: contribution.id
                }
            });

            await prisma.contribution.update({
                where: { id: contributionId },
                data: {
                    refundStatus: 'PROCESSING',
                    refundAmount: contribution.amount,
                    refundInitiatedAt: new Date(),
                    razorpayRefundId: refund.id
                }
            });

            return refund;
        } catch (error) {
            throw new Error(`Refund failed: ${error.message}`);
        }
    }

    calculatePlatformFee(amount) {
        const feePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || 5);
        return (amount * feePercentage) / 100;
    }

    calculateCleanerPayout(campaignAmount) {
        const fee = this.calculatePlatformFee(campaignAmount);
        return campaignAmount - fee;
    }

    /**
     * Get financial overview for admin dashboard
     */
    async getFinancialOverview() {
        const [
            totalRaised,
            totalPaidOut,
            escrowBalance,
            pendingPayouts,
            pendingRefunds
        ] = await Promise.all([
            prisma.contribution.aggregate({
                where: { status: 'SUCCESS' },
                _sum: { amount: true }
            }),
            prisma.payout.aggregate({
                where: { status: 'PAID' },
                _sum: { amount: true }
            }),
            prisma.escrowTransaction.aggregate({
                where: { status: 'HELD' },
                _sum: { amount: true }
            }),
            prisma.payout.aggregate({
                where: { status: { in: ['PENDING', 'PROCESSING'] } },
                _sum: { amount: true }
            }),
            prisma.contribution.aggregate({
                where: { refundStatus: { in: ['PENDING', 'PROCESSING'] } },
                _sum: { amount: true }
            })
        ]);

        const totalRaisedAmount = totalRaised._sum.amount || 0;
        const platformFees = totalRaisedAmount * 0.05;

        return {
            totalRaised: totalRaisedAmount,
            totalPaidOut: totalPaidOut._sum.amount || 0,
            platformFees,
            escrowBalance: escrowBalance._sum.amount || 0,
            pendingPayouts: pendingPayouts._sum.amount || 0,
            pendingRefunds: pendingRefunds._sum.amount || 0
        };
    }
}

module.exports = new PaymentService();
