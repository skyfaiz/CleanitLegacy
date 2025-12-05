const paymentService = require('../services/paymentService');
const { handlePayoutWebhook } = require('../cron/payoutProcessor');
const { handleRefundWebhook } = require('../cron/refundProcessor');

/**
 * Handle Razorpay webhooks
 * Endpoint: POST /api/webhooks/razorpay
 */
exports.handleRazorpayWebhook = async (req, res) => {
    try {
        const signature = req.headers['x-razorpay-signature'];
        const body = req.body;

        // Verify webhook signature
        if (process.env.RAZORPAY_WEBHOOK_SECRET) {
            const isValid = paymentService.verifyWebhookSignature(body, signature);
            if (!isValid) {
                console.error('[Webhook] Invalid signature');
                return res.status(400).json({ error: 'Invalid signature' });
            }
        }

        const event = body.event;
        const payload = body.payload;

        console.log(`[Webhook] Received event: ${event}`);

        switch (event) {
            // Payment events
            case 'payment.captured':
            case 'payment.authorized':
                await handlePaymentSuccess(payload);
                break;

            case 'payment.failed':
                await handlePaymentFailure(payload);
                break;

            // Payout events
            case 'payout.processed':
            case 'payout.failed':
            case 'payout.reversed':
                await handlePayoutWebhook(event, payload);
                break;

            // Refund events
            case 'refund.processed':
            case 'refund.failed':
                await handleRefundWebhook(event, payload);
                break;

            default:
                console.log(`[Webhook] Unhandled event: ${event}`);
        }

        // Always respond 200 to acknowledge receipt
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('[Webhook] Error processing webhook:', error);
        // Still return 200 to prevent retries for processing errors
        res.status(200).json({ received: true, error: error.message });
    }
};

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(payload) {
    const payment = payload.payment?.entity;
    if (!payment) return;

    const { notes, id: paymentId } = payment;
    const contributionId = notes?.contributionId;

    if (contributionId) {
        try {
            await paymentService.processSuccessfulPayment(contributionId, paymentId);
            console.log(`[Webhook] Payment processed for contribution: ${contributionId}`);
        } catch (error) {
            console.error(`[Webhook] Error processing payment for contribution ${contributionId}:`, error);
        }
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(payload) {
    const payment = payload.payment?.entity;
    if (!payment) return;

    const { notes, id: paymentId, error_code, error_description } = payment;
    const contributionId = notes?.contributionId;

    if (contributionId) {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        try {
            await prisma.contribution.update({
                where: { id: contributionId },
                data: {
                    status: 'FAILED',
                    razorpayPaymentId: paymentId
                }
            });
            console.log(`[Webhook] Payment failed for contribution: ${contributionId} - ${error_description}`);
        } catch (error) {
            console.error(`[Webhook] Error updating failed payment for contribution ${contributionId}:`, error);
        }
    }
}
