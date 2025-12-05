const { PrismaClient } = require('@prisma/client');
const paymentService = require('../services/paymentService');
const { generatePresignedUrl } = require('../services/storageService');

const prisma = new PrismaClient();

exports.getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalCampaigns,
            activeCampaigns,
            totalContributions,
            totalAmount,
            pendingJobs,
            completedJobs,
            totalUsers
        ] = await Promise.all([
            prisma.campaign.count(),
            prisma.campaign.count({ where: { status: 'ACTIVE' } }),
            prisma.contribution.count(),
            prisma.contribution.aggregate({
                _sum: { amount: true }
            }),
            prisma.job.count({ where: { status: 'COMPLETED' } }),
            prisma.job.count({ where: { status: 'VERIFIED' } }),
            prisma.user.count()
        ]);

        res.json({
            stats: {
                totalCampaigns,
                activeCampaigns,
                totalContributions,
                totalAmount: totalAmount._sum.amount || 0,
                pendingJobs,
                completedJobs,
                totalUsers
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                avatarUrl: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ users });
    } catch (error) {
        next(error);
    }
};

// Update user role
exports.updateUserRole = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!['CITIZEN', 'CLEANER', 'ADMIN'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

// Get all campaigns for admin
exports.getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await prisma.campaign.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Generate presigned URLs for images
        for (const campaign of campaigns) {
            campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
        }

        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};

// Update campaign status
exports.updateCampaignStatus = async (req, res, next) => {
    try {
        const { campaignId } = req.params;
        const { status } = req.body;

        if (!['ACTIVE', 'FUNDED', 'COMPLETED', 'EXPIRED'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const campaign = await prisma.campaign.update({
            where: { id: campaignId },
            data: { status }
        });

        res.json({ campaign });
    } catch (error) {
        next(error);
    }
};

// Get jobs with optional status filter
exports.getJobs = async (req, res, next) => {
    try {
        const { status } = req.query;

        const where = status ? { status } : {};

        const jobs = await prisma.job.findMany({
            where,
            include: {
                campaign: true,
                cleaner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Generate presigned URLs for images
        for (const job of jobs) {
            if (job.campaign?.imageUrl) {
                job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
            }
            if (job.completionImageUrl) {
                job.completionImageUrl = await generatePresignedUrl(job.completionImageUrl);
            }
        }

        res.json({ jobs });
    } catch (error) {
        next(error);
    }
};

exports.getPendingJobs = async (req, res, next) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { status: 'COMPLETED' },
            include: {
                campaign: {
                    include: {
                        creator: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                cleaner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            },
            orderBy: { completedAt: 'asc' }
        });

        // Generate presigned URLs
        for (const job of jobs) {
            if (job.campaign?.imageUrl) {
                job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
            }
            if (job.completionImageUrl) {
                job.completionImageUrl = await generatePresignedUrl(job.completionImageUrl);
            }
        }

        res.json({ jobs });
    } catch (error) {
        next(error);
    }
};

exports.verifyJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: true,
                cleaner: true
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'COMPLETED') {
            return res.status(400).json({ error: 'Job is not completed' });
        }

        // Calculate payout amount
        const campaignAmount = job.campaign.amountRaised;
        const payoutAmount = paymentService.calculateCleanerPayout(campaignAmount);

        const updatedJob = await prisma.$transaction(async (tx) => {
            // Update job status
            const verifiedJob = await tx.job.update({
                where: { id: jobId },
                data: {
                    status: 'VERIFIED',
                    verifiedAt: new Date(),
                    payoutAmount
                }
            });

            // Update campaign status
            await tx.campaign.update({
                where: { id: job.campaignId },
                data: { status: 'COMPLETED' }
            });

            return verifiedJob;
        });

        res.json({
            message: 'Job verified successfully',
            job: updatedJob,
            payoutAmount
        });
    } catch (error) {
        next(error);
    }
};

// Process payout for verified job
exports.processPayout = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: { cleaner: true, campaign: true }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'VERIFIED') {
            return res.status(400).json({ error: 'Job must be verified before payout' });
        }

        // For MVP, just mark as paid (in production, integrate with Razorpay payouts)
        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: {
                status: 'PAID',
                payoutId: `manual_${Date.now()}`
            }
        });

        res.json({
            message: 'Payout processed successfully',
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
};

exports.rejectJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { reason } = req.body;

        const job = await prisma.job.findUnique({
            where: { id: jobId }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'COMPLETED') {
            return res.status(400).json({ error: 'Job is not completed' });
        }

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: {
                status: 'CLAIMED',
                completionImageUrl: null,
                completedAt: null
            }
        });

        res.json({
            message: 'Job rejected',
            job: updatedJob,
            reason
        });
    } catch (error) {
        next(error);
    }
};

