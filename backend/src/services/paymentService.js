const Razorpay = require('razorpay');
const crypto = require('crypto');

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn('⚠️  Warning: Razorpay credentials not configured. Payment features will not work.');
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'missing_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'missing_secret'
});

class PaymentService {
    async createOrder(amount, campaignId, userId) {
        // Check if Razorpay is configured
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.');
        }

        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`, // Max 40 chars
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

    verifyPaymentSignature(orderId, paymentId, signature) {
        const body = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        return expectedSignature === signature;
    }

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

    calculatePlatformFee(amount) {
        const feePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || 5);
        return (amount * feePercentage) / 100;
    }

    calculateCleanerPayout(campaignAmount) {
        const fee = this.calculatePlatformFee(campaignAmount);
        return campaignAmount - fee;
    }
}

module.exports = new PaymentService();
