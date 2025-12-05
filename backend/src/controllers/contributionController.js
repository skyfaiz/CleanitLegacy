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
