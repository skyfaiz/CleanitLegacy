const { PrismaClient } = require('@prisma/client');
const { uploadToS3, generatePresignedUrl } = require('../services/storageService');

const prisma = new PrismaClient();

exports.getAvailableJobs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                where: { status: 'AVAILABLE' },
                skip,
                take: parseInt(limit),
                include: {
                    campaign: {
                        include: {
                            creator: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatarUrl: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.job.count({ where: { status: 'AVAILABLE' } })
        ]);

        // Generate presigned URLs
        await Promise.all(jobs.map(async (job) => {
            if (job.campaign && job.campaign.imageUrl) {
                job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
            }
        }));

        res.json({
            jobs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getCleanerJobs = async (req, res, next) => {
    try {
        const cleanerId = req.user.userId;
        const { status } = req.query;

        const where = {
            cleanerId,
            ...(status && { status })
        };

        const jobs = await prisma.job.findMany({
            where,
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
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Generate presigned URLs
        await Promise.all(jobs.map(async (job) => {
            if (job.campaign && job.campaign.imageUrl) {
                job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
            }
            if (job.completionImageUrl) {
                job.completionImageUrl = await generatePresignedUrl(job.completionImageUrl);
            }
        }));

        res.json({ jobs });
    } catch (error) {
        next(error);
    }
};

exports.claimJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const cleanerId = req.user.userId;

        const job = await prisma.job.findUnique({
            where: { id: jobId }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'AVAILABLE') {
            return res.status(400).json({ error: 'Job is not available' });
        }

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: {
                status: 'CLAIMED',
                cleanerId
            },
            include: {
                campaign: true
            }
        });

        // Generate presigned URLs for response
        if (updatedJob.campaign && updatedJob.campaign.imageUrl) {
            updatedJob.campaign.imageUrl = await generatePresignedUrl(updatedJob.campaign.imageUrl);
        }

        res.json({
            message: 'Job claimed successfully',
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
};

exports.completeJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const cleanerId = req.user.userId;

        if (!req.file) {
            return res.status(400).json({ error: 'Completion image required' });
        }

        const job = await prisma.job.findUnique({
            where: { id: jobId }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.cleanerId !== cleanerId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (job.status !== 'CLAIMED') {
            return res.status(400).json({ error: 'Job cannot be completed' });
        }

        // Upload completion image
        const imageUrl = await uploadToS3(req.file);

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: {
                status: 'COMPLETED',
                completionImageUrl: imageUrl,
                completedAt: new Date()
            },
            include: {
                campaign: true
            }
        });

        // Generate presigned URLs for response
        if (updatedJob.completionImageUrl) {
            updatedJob.completionImageUrl = await generatePresignedUrl(updatedJob.completionImageUrl);
        }
        if (updatedJob.campaign && updatedJob.campaign.imageUrl) {
            updatedJob.campaign.imageUrl = await generatePresignedUrl(updatedJob.campaign.imageUrl);
        }

        res.json({
            message: 'Job marked as completed. Awaiting verification.',
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
};
