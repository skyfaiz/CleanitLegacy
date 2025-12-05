const { PrismaClient } = require('@prisma/client');
const { uploadToS3, generatePresignedUrl } = require('../services/storageService');
const { eventBus, EventTypes } = require('../services/eventBus');

const prisma = new PrismaClient();

// Job configuration constants
const JOB_CONFIG = {
    MAX_ACTIVE_JOBS_PER_CLEANER: 5,
    COMPLETION_DEADLINE_DAYS: 7,
    MIN_HOURS_BEFORE_UNCLAIM: 24,
    GPS_TOLERANCE_METERS: 500
};

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

/**
 * Claim a job with race condition handling
 * Uses database transaction to prevent double-claiming
 */
exports.claimJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const cleanerId = req.user.userId;

        // Check if cleaner is suspended
        const cleaner = await prisma.user.findUnique({
            where: { id: cleanerId },
            include: { cleanerProfile: true }
        });

        if (!cleaner) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (cleaner.isSuspended) {
            return res.status(403).json({ error: 'Your account is suspended. Contact support.' });
        }

        // Ensure cleaner profile exists
        let cleanerProfile = cleaner.cleanerProfile;
        if (!cleanerProfile) {
            cleanerProfile = await prisma.cleanerProfile.create({
                data: { userId: cleanerId }
            });
        }

        // Check active jobs limit
        if (cleanerProfile.activeJobs >= JOB_CONFIG.MAX_ACTIVE_JOBS_PER_CLEANER) {
            return res.status(429).json({ 
                error: `You can only have ${JOB_CONFIG.MAX_ACTIVE_JOBS_PER_CLEANER} active jobs at a time. Complete existing jobs first.` 
            });
        }

        // Use transaction for atomic claim operation
        const result = await prisma.$transaction(async (tx) => {
            // Lock and fetch job
            const job = await tx.job.findUnique({
                where: { id: jobId },
                include: {
                    campaign: {
                        include: {
                            creator: { select: { id: true, name: true } }
                        }
                    }
                }
            });

            if (!job) {
                throw new Error('JOB_NOT_FOUND');
            }

            if (job.status !== 'AVAILABLE') {
                throw new Error('JOB_NOT_AVAILABLE');
            }

            // Prevent same cleaner from re-claiming after release
            if (job.lastClaimedBy === cleanerId) {
                throw new Error('CANNOT_RECLAIM');
            }

            // Calculate completion deadline
            const completionDeadline = new Date();
            completionDeadline.setDate(completionDeadline.getDate() + JOB_CONFIG.COMPLETION_DEADLINE_DAYS);

            // Update job
            const updatedJob = await tx.job.update({
                where: { id: jobId },
                data: {
                    status: 'CLAIMED',
                    cleanerId,
                    claimedAt: new Date(),
                    completionDeadline,
                    claimCount: { increment: 1 }
                },
                include: {
                    campaign: {
                        include: {
                            creator: { select: { id: true, name: true } }
                        }
                    }
                }
            });

            // Update cleaner profile active jobs count
            await tx.cleanerProfile.update({
                where: { userId: cleanerId },
                data: { activeJobs: { increment: 1 } }
            });

            // Create activity log
            await tx.activityLog.create({
                data: {
                    userId: cleanerId,
                    action: 'JOB_CLAIMED',
                    entityType: 'job',
                    entityId: jobId,
                    metadata: {
                        campaignId: job.campaignId,
                        amount: job.amount
                    }
                }
            });

            return updatedJob;
        });

        // Generate presigned URLs for response
        if (result.campaign && result.campaign.imageUrl) {
            result.campaign.imageUrl = await generatePresignedUrl(result.campaign.imageUrl);
        }

        // Emit event for notifications
        eventBus.emitEvent(EventTypes.JOB_CLAIMED, {
            jobId: result.id,
            campaignId: result.campaignId,
            creatorId: result.campaign.creatorId,
            campaignTitle: result.campaign.title,
            cleanerId,
            cleanerName: cleaner.name
        });

        res.json({
            message: `Job claimed successfully. Complete by ${result.completionDeadline.toLocaleDateString()}`,
            job: result
        });
    } catch (error) {
        // Handle specific transaction errors
        if (error.message === 'JOB_NOT_FOUND') {
            return res.status(404).json({ error: 'Job not found' });
        }
        if (error.message === 'JOB_NOT_AVAILABLE') {
            return res.status(409).json({ error: 'Job is no longer available. It may have been claimed by another cleaner.' });
        }
        if (error.message === 'CANNOT_RECLAIM') {
            return res.status(400).json({ error: 'You cannot reclaim a job you previously released.' });
        }
        next(error);
    }
};

/**
 * Complete a job with photo upload and metadata extraction
 */
exports.completeJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const cleanerId = req.user.userId;

        if (!req.file) {
            return res.status(400).json({ error: 'Completion image required' });
        }

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: {
                    include: {
                        creator: { select: { id: true, name: true } }
                    }
                }
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.cleanerId !== cleanerId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (job.status !== 'CLAIMED') {
            return res.status(400).json({ error: 'Job cannot be completed in current state' });
        }

        // Upload completion image
        const imageUrl = await uploadToS3(req.file);

        // Extract photo metadata (simplified - in production use exif-parser)
        const photoMetadata = {
            uploadedAt: new Date().toISOString(),
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            // GPS and timestamp would be extracted from EXIF in production
        };

        // Validate photo was taken after claim date
        // In production, extract EXIF timestamp and compare with claimedAt

        const updatedJob = await prisma.$transaction(async (tx) => {
            // Update job
            const updated = await tx.job.update({
                where: { id: jobId },
                data: {
                    status: 'COMPLETED',
                    completionImageUrl: imageUrl,
                    completionPhotoMetadata: photoMetadata,
                    completedAt: new Date()
                },
                include: {
                    campaign: {
                        include: {
                            creator: { select: { id: true, name: true } }
                        }
                    }
                }
            });

            // Update campaign status
            await tx.campaign.update({
                where: { id: job.campaignId },
                data: { status: 'COMPLETED' }
            });

            // Create activity log
            await tx.activityLog.create({
                data: {
                    userId: cleanerId,
                    action: 'JOB_COMPLETED',
                    entityType: 'job',
                    entityId: jobId,
                    metadata: {
                        campaignId: job.campaignId,
                        completedAt: new Date().toISOString()
                    }
                }
            });

            return updated;
        });

        // Generate presigned URLs for response
        if (updatedJob.completionImageUrl) {
            updatedJob.completionImageUrl = await generatePresignedUrl(updatedJob.completionImageUrl);
        }
        if (updatedJob.campaign && updatedJob.campaign.imageUrl) {
            updatedJob.campaign.imageUrl = await generatePresignedUrl(updatedJob.campaign.imageUrl);
        }

        // Emit event for notifications
        eventBus.emitEvent(EventTypes.JOB_COMPLETED, {
            jobId: updatedJob.id,
            campaignId: updatedJob.campaignId,
            creatorId: updatedJob.campaign.creatorId,
            campaignTitle: updatedJob.campaign.title,
            cleanerId
        });

        res.json({
            message: 'Job marked as completed. Awaiting admin verification.',
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Unclaim a job voluntarily
 * Only allowed if deadline is > 24 hours away
 */
exports.unclaimJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { reason } = req.body;
        const cleanerId = req.user.userId;

        if (!reason || reason.trim().length < 10) {
            return res.status(400).json({ error: 'Please provide a reason (at least 10 characters)' });
        }

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: {
                    include: {
                        creator: { select: { id: true, name: true } }
                    }
                }
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.cleanerId !== cleanerId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (job.status !== 'CLAIMED') {
            return res.status(400).json({ error: 'Job cannot be unclaimed in current state' });
        }

        // Check if deadline is > 24 hours away
        const now = new Date();
        const hoursUntilDeadline = (job.completionDeadline - now) / (1000 * 60 * 60);

        if (hoursUntilDeadline < JOB_CONFIG.MIN_HOURS_BEFORE_UNCLAIM) {
            return res.status(400).json({ 
                error: `Cannot unclaim within ${JOB_CONFIG.MIN_HOURS_BEFORE_UNCLAIM} hours of deadline. Complete the job or wait for auto-release.` 
            });
        }

        await prisma.$transaction(async (tx) => {
            // Update job
            await tx.job.update({
                where: { id: jobId },
                data: {
                    status: 'AVAILABLE',
                    cleanerId: null,
                    claimedAt: null,
                    completionDeadline: null,
                    unclaimedAt: new Date(),
                    unclaimReason: reason
                    // Note: lastClaimedBy is NOT set - voluntary unclaim allows reclaim
                }
            });

            // Update cleaner profile
            await tx.cleanerProfile.update({
                where: { userId: cleanerId },
                data: { activeJobs: { decrement: 1 } }
            });

            // Create activity log (no penalty for voluntary unclaim)
            await tx.activityLog.create({
                data: {
                    userId: cleanerId,
                    action: 'JOB_UNCLAIMED',
                    entityType: 'job',
                    entityId: jobId,
                    metadata: {
                        campaignId: job.campaignId,
                        reason
                    }
                }
            });
        });

        // Emit events
        eventBus.emitEvent(EventTypes.JOB_UNCLAIMED, {
            jobId: job.id,
            campaignId: job.campaignId,
            creatorId: job.campaign.creatorId,
            campaignTitle: job.campaign.title,
            cleanerId
        });

        eventBus.emitEvent(EventTypes.JOB_AVAILABLE, {
            jobId: job.id,
            campaignId: job.campaignId,
            campaignTitle: job.campaign.title,
            amount: job.amount,
            location: job.campaign.location
        });

        res.json({ message: 'Job unclaimed successfully. No penalty applied.' });
    } catch (error) {
        next(error);
    }
};

/**
 * Get job details by ID
 */
exports.getJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: {
                    include: {
                        creator: {
                            select: { id: true, name: true, avatarUrl: true }
                        }
                    }
                },
                cleaner: {
                    select: { id: true, name: true, avatarUrl: true }
                }
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Generate presigned URLs
        if (job.campaign && job.campaign.imageUrl) {
            job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
        }
        if (job.completionImageUrl) {
            job.completionImageUrl = await generatePresignedUrl(job.completionImageUrl);
        }

        res.json({ job });
    } catch (error) {
        next(error);
    }
};
