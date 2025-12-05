const { PrismaClient } = require('@prisma/client');
const paymentService = require('../services/paymentService');
const { generatePresignedUrl } = require('../services/storageService');
const { eventBus, EventTypes } = require('../services/eventBus');
const { initiateRefundsForCampaign } = require('../cron/refundProcessor');

const prisma = new PrismaClient();

// Rejection reasons enum
const REJECTION_REASONS = {
    POOR_QUALITY: 'Cleaning quality insufficient',
    WRONG_LOCATION: 'Photos don\'t match campaign location',
    FAKE_COMPLETION: 'Evidence of staging/fraud',
    PHOTO_ISSUES: 'Photo quality too poor to verify',
    OTHER: 'Other reason'
};

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

/**
 * Get verification queue with priority sorting
 * Priority: Urgent (>48h) > High-value (>₹5000) > First-time cleaners > Standard (FIFO)
 */
exports.getVerificationQueue = async (req, res, next) => {
    try {
        const now = new Date();
        const urgentThreshold = new Date(now.getTime() - 48 * 60 * 60 * 1000);
        const highValueThreshold = 5000;

        const jobs = await prisma.job.findMany({
            where: { status: 'COMPLETED' },
            include: {
                campaign: {
                    include: {
                        creator: {
                            select: { id: true, name: true, email: true }
                        }
                    }
                },
                cleaner: {
                    select: { id: true, name: true, email: true, phone: true },
                }
            },
            orderBy: { completedAt: 'asc' }
        });

        // Get cleaner profiles for rating info
        const cleanerIds = jobs.map(j => j.cleanerId).filter(Boolean);
        const cleanerProfiles = await prisma.cleanerProfile.findMany({
            where: { userId: { in: cleanerIds } }
        });
        const profileMap = new Map(cleanerProfiles.map(p => [p.userId, p]));

        // Add priority and metadata to each job
        const enrichedJobs = await Promise.all(jobs.map(async (job) => {
            const profile = profileMap.get(job.cleanerId);
            const isUrgent = job.completedAt < urgentThreshold;
            const isHighValue = job.amount > highValueThreshold;
            const isFirstTimeCleaner = profile ? profile.completedJobs === 0 : true;
            const hoursSinceCompletion = Math.floor((now - job.completedAt) / (1000 * 60 * 60));

            // Calculate priority score (lower = higher priority)
            let priorityScore = 100;
            if (isUrgent) priorityScore -= 50;
            if (isHighValue) priorityScore -= 30;
            if (isFirstTimeCleaner) priorityScore -= 20;

            // Generate presigned URLs
            if (job.campaign?.imageUrl) {
                job.campaign.imageUrl = await generatePresignedUrl(job.campaign.imageUrl);
            }
            if (job.completionImageUrl) {
                job.completionImageUrl = await generatePresignedUrl(job.completionImageUrl);
            }

            return {
                ...job,
                priority: {
                    score: priorityScore,
                    isUrgent,
                    isHighValue,
                    isFirstTimeCleaner
                },
                metadata: {
                    hoursSinceCompletion,
                    cleanerRating: profile?.rating || null,
                    cleanerCompletedJobs: profile?.completedJobs || 0,
                    cleanerRejections: profile?.rejections || 0
                },
                autoFlags: getAutoFlags(job, profile)
            };
        }));

        // Sort by priority score
        enrichedJobs.sort((a, b) => a.priority.score - b.priority.score);

        res.json({ 
            jobs: enrichedJobs,
            stats: {
                total: enrichedJobs.length,
                urgent: enrichedJobs.filter(j => j.priority.isUrgent).length,
                highValue: enrichedJobs.filter(j => j.priority.isHighValue).length
            }
        });
    } catch (error) {
        next(error);
    }
};

// Legacy endpoint - redirect to new one
exports.getPendingJobs = exports.getVerificationQueue;

/**
 * Get auto-flags for a job based on metadata
 */
function getAutoFlags(job, cleanerProfile) {
    const flags = [];

    // Check GPS mismatch (would need actual GPS data in production)
    if (job.completionPhotoMetadata?.gpsMismatch) {
        flags.push({ type: 'LOCATION_MISMATCH', severity: 'high' });
    }

    // Check timestamp issues
    if (job.completionPhotoMetadata?.timestampSuspicious) {
        flags.push({ type: 'TIMESTAMP_ISSUE', severity: 'medium' });
    }

    // Check cleaner history
    if (cleanerProfile) {
        if (cleanerProfile.rating < 3) {
            flags.push({ type: 'LOW_RATING_CLEANER', severity: 'medium' });
        }
        if (cleanerProfile.rejections > 2) {
            flags.push({ type: 'MULTIPLE_REJECTIONS', severity: 'high' });
        }
    }

    return flags;
}

/**
 * Approve/Verify a completed job
 * Creates payout record with 24-hour cooling period
 */
exports.verifyJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { notes } = req.body;
        const adminId = req.user.userId;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: {
                    include: {
                        creator: { select: { id: true, name: true } }
                    }
                },
                cleaner: { select: { id: true, name: true } }
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'COMPLETED') {
            return res.status(400).json({ error: 'Job is not in COMPLETED state' });
        }

        // Calculate payout amount (95% of campaign amount)
        const payoutAmount = job.amount || (job.campaign.amountRaised * 0.95);

        // Schedule payout for 24 hours from now (cooling period)
        const scheduledFor = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const result = await prisma.$transaction(async (tx) => {
            // Update job status
            const verifiedJob = await tx.job.update({
                where: { id: jobId },
                data: {
                    status: 'VERIFIED',
                    verifiedAt: new Date(),
                    verifiedBy: adminId,
                    verificationNotes: notes
                }
            });

            // Create payout record
            const payout = await tx.payout.create({
                data: {
                    jobId: jobId,
                    cleanerId: job.cleanerId,
                    amount: payoutAmount,
                    status: 'PENDING',
                    scheduledFor
                }
            });

            // Update cleaner profile metrics
            await tx.cleanerProfile.upsert({
                where: { userId: job.cleanerId },
                update: {
                    activeJobs: { decrement: 1 }
                },
                create: {
                    userId: job.cleanerId,
                    activeJobs: 0
                }
            });

            // Create activity log
            await tx.activityLog.create({
                data: {
                    userId: adminId,
                    action: 'JOB_VERIFIED',
                    entityType: 'job',
                    entityId: jobId,
                    metadata: {
                        cleanerId: job.cleanerId,
                        payoutAmount,
                        scheduledFor: scheduledFor.toISOString()
                    }
                }
            });

            return { verifiedJob, payout };
        });

        // Emit events for notifications
        eventBus.emitEvent(EventTypes.JOB_VERIFIED, {
            jobId: job.id,
            campaignId: job.campaignId,
            cleanerId: job.cleanerId,
            creatorId: job.campaign.creatorId,
            campaignTitle: job.campaign.title,
            amount: payoutAmount
        });

        res.json({
            message: 'Job verified successfully. Payment scheduled.',
            job: result.verifiedJob,
            payout: {
                amount: payoutAmount,
                scheduledFor
            }
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

/**
 * Reject a completed job
 * Can allow retry or permanently fail the job
 */
exports.rejectJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { reason, notes, allowRetry = true } = req.body;
        const adminId = req.user.userId;

        // Validate rejection reason
        if (!reason || !Object.keys(REJECTION_REASONS).includes(reason)) {
            return res.status(400).json({ 
                error: 'Valid rejection reason required',
                validReasons: Object.keys(REJECTION_REASONS)
            });
        }

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                campaign: { select: { id: true, title: true } }
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status !== 'COMPLETED') {
            return res.status(400).json({ error: 'Job is not in COMPLETED state' });
        }

        const result = await prisma.$transaction(async (tx) => {
            // Update job
            const updatedJob = await tx.job.update({
                where: { id: jobId },
                data: {
                    status: allowRetry ? 'CLAIMED' : 'FAILED',
                    rejectedAt: new Date(),
                    rejectedBy: adminId,
                    rejectionReason: reason,
                    rejectionNotes: notes,
                    retryAllowed: allowRetry,
                    completionImageUrl: allowRetry ? null : job.completionImageUrl,
                    completedAt: allowRetry ? null : job.completedAt
                }
            });

            // Update cleaner profile
            const profile = await tx.cleanerProfile.findUnique({
                where: { userId: job.cleanerId }
            });

            if (profile) {
                const newRejections = profile.rejections + 1;
                const newRating = Math.max(1.0, profile.rating - 0.3);

                await tx.cleanerProfile.update({
                    where: { userId: job.cleanerId },
                    data: {
                        rejections: newRejections,
                        rating: newRating,
                        activeJobs: allowRetry ? profile.activeJobs : Math.max(0, profile.activeJobs - 1)
                    }
                });

                // Suspend if too many rejections
                if (newRejections >= 3 && reason === 'FAKE_COMPLETION') {
                    await tx.user.update({
                        where: { id: job.cleanerId },
                        data: {
                            isSuspended: true,
                            suspendedAt: new Date(),
                            suspendReason: 'Multiple fraudulent submissions'
                        }
                    });
                }
            }

            // Create activity log
            await tx.activityLog.create({
                data: {
                    userId: adminId,
                    action: 'JOB_REJECTED',
                    entityType: 'job',
                    entityId: jobId,
                    metadata: {
                        cleanerId: job.cleanerId,
                        reason,
                        allowRetry
                    }
                }
            });

            return updatedJob;
        });

        // Emit event for notification
        eventBus.emitEvent(EventTypes.JOB_REJECTED, {
            jobId: job.id,
            campaignId: job.campaignId,
            cleanerId: job.cleanerId,
            reason: REJECTION_REASONS[reason],
            retryAllowed: allowRetry
        });

        res.json({
            message: allowRetry 
                ? 'Job rejected. Cleaner can re-submit.'
                : 'Job rejected permanently.',
            job: result,
            reason: REJECTION_REASONS[reason]
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Approve a draft campaign (first-time user)
 */
exports.approveCampaign = async (req, res, next) => {
    try {
        const { campaignId } = req.params;
        const adminId = req.user.userId;

        const campaign = await prisma.campaign.findUnique({
            where: { id: campaignId },
            include: {
                creator: { select: { id: true, name: true } }
            }
        });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        if (campaign.status !== 'DRAFT') {
            return res.status(400).json({ error: 'Campaign is not in DRAFT state' });
        }

        const updatedCampaign = await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                status: 'ACTIVE',
                isFirstTime: false
            }
        });

        // Emit event
        eventBus.emitEvent(EventTypes.CAMPAIGN_APPROVED, {
            campaignId: campaign.id,
            creatorId: campaign.creatorId,
            campaignTitle: campaign.title
        });

        res.json({
            message: 'Campaign approved and now active',
            campaign: updatedCampaign
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get financial overview
 */
exports.getFinancialOverview = async (req, res, next) => {
    try {
        const overview = await paymentService.getFinancialOverview();
        res.json(overview);
    } catch (error) {
        next(error);
    }
};

/**
 * Get pending draft campaigns for approval
 */
exports.getPendingCampaigns = async (req, res, next) => {
    try {
        const campaigns = await prisma.campaign.findMany({
            where: { status: 'DRAFT' },
            include: {
                creator: {
                    select: { id: true, name: true, email: true, createdAt: true }
                }
            },
            orderBy: { createdAt: 'asc' }
        });

        // Generate presigned URLs
        for (const campaign of campaigns) {
            if (campaign.imageUrl) {
                campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
            }
        }

        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};

/**
 * Suspend a user
 */
exports.suspendUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { reason } = req.body;
        const adminId = req.user.userId;

        if (!reason) {
            return res.status(400).json({ error: 'Suspension reason required' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                isSuspended: true,
                suspendedAt: new Date(),
                suspendReason: reason
            },
            select: { id: true, name: true, email: true, role: true }
        });

        // Log action
        await prisma.activityLog.create({
            data: {
                userId: adminId,
                action: 'USER_SUSPENDED',
                entityType: 'user',
                entityId: userId,
                metadata: { reason }
            }
        });

        res.json({ message: 'User suspended', user });
    } catch (error) {
        next(error);
    }
};

/**
 * Unsuspend a user
 */
exports.unsuspendUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const adminId = req.user.userId;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                isSuspended: false,
                suspendedAt: null,
                suspendReason: null
            },
            select: { id: true, name: true, email: true, role: true }
        });

        // Log action
        await prisma.activityLog.create({
            data: {
                userId: adminId,
                action: 'USER_UNSUSPENDED',
                entityType: 'user',
                entityId: userId
            }
        });

        res.json({ message: 'User unsuspended', user });
    } catch (error) {
        next(error);
    }
};

