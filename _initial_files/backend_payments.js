// backend/src/services/paymentService.js

const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

class PaymentService {
  async createOrder(amount, campaignId, userId) {
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: `campaign_${campaignId}_${Date.now()}`,
      notes: {
        campaignId,
        userId
      }
    };

    try {
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      throw new Error(`Payment order creation failed: ${error.message}`);
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

// ============================================

// backend/src/routes/contributionRoutes.js

const express = require('express');
const { body } = require('express-validator');
const contributionController = require('../controllers/contributionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order',
  authenticateToken,
  [
    body('campaignId').notEmpty(),
    body('amount').isFloat({ min: 10 })
  ],
  contributionController.createOrder
);

router.post('/verify',
  authenticateToken,
  [
    body('orderId').notEmpty(),
    body('paymentId').notEmpty(),
    body('signature').notEmpty(),
    body('campaignId').notEmpty(),
    body('amount').isFloat({ min: 10 })
  ],
  contributionController.verifyPayment
);

router.get('/user/:userId',
  authenticateToken,
  contributionController.getUserContributions
);

module.exports = router;

// ============================================

// backend/src/controllers/contributionController.js

const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const paymentService = require('../services/paymentService');

const prisma = new PrismaClient();

exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { campaignId, amount } = req.body;
    const userId = req.user.userId;

    // Verify campaign exists and is active
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Campaign is not accepting contributions' });
    }

    // Create payment order
    const order = await paymentService.createOrder(amount, campaignId, userId);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, paymentId, signature, campaignId, amount } = req.body;
    const userId = req.user.userId;

    // Verify signature
    const isValid = paymentService.verifyPaymentSignature(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Create contribution record
    const contribution = await prisma.contribution.create({
      data: {
        amount: parseFloat(amount),
        userId,
        campaignId,
        paymentId,
        status: 'completed'
      }
    });

    // Update campaign amount
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        amountRaised: {
          increment: parseFloat(amount)
        }
      }
    });

    // Check if campaign is fully funded
    if (campaign.amountRaised >= campaign.targetAmount) {
      await prisma.$transaction(async (tx) => {
        // Update campaign status
        await tx.campaign.update({
          where: { id: campaignId },
          data: { status: 'FUNDED' }
        });

        // Create job for cleaners
        await tx.job.create({
          data: {
            campaignId,
            status: 'AVAILABLE'
          }
        });
      });
    }

    res.json({
      message: 'Payment verified successfully',
      contribution,
      campaign: {
        id: campaign.id,
        amountRaised: campaign.amountRaised,
        targetAmount: campaign.targetAmount,
        status: campaign.status
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserContributions = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const requesterId = req.user.userId;

    // Users can only view their own contributions
    if (userId !== requesterId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const contributions = await prisma.contribution.findMany({
      where: { userId },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ contributions });
  } catch (error) {
    next(error);
  }
};