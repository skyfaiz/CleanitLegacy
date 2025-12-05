const { PrismaClient } = require('@prisma/client');
const { eventBus, EventTypes } = require('../services/eventBus');

const prisma = new PrismaClient();

const MAX_CLAIM_ATTEMPTS = 3;
const MAX_PENALTIES_BEFORE_SUSPENSION = 3;

/**
 * Process jobs that have missed their completion deadline
 * - Release job back to AVAILABLE if claimCount < 3
 * - Flag for admin review if claimCount >= 3
 * - Apply penalty to cleaner
 */
async function processJobAutoRelease() {
    const now = new Date();

    // Find overdue claimed jobs
    const overdueJobs = await prisma.job.findMany({
        where: {
            status: 'CLAIMED',
            completionDeadline: {
                lt: now
            }
        },
        include: {
            campaign: {
                select: { id: true, title: true, creatorId: true, location: true }
            },
            cleaner: {
                select: { id: true, name: true }
            }
        }
    });

    console.log(`[JobAutoRelease] Found ${overdueJobs.length} overdue jobs`);

    for (const job of overdueJobs) {
        try {
            await processOverdueJob(job);
        } catch (error) {
            console.error(`[JobAutoRelease] Error processing job ${job.id}:`, error);
        }
    }
}

/**
 * Process a single overdue job
 */
async function processOverdueJob(job) {
    const newClaimCount = job.claimCount + 1;

    await prisma.$transaction(async (tx) => {
        if (newClaimCount >= MAX_CLAIM_ATTEMPTS) {
            // Flag for admin review - too many failed attempts
            await tx.job.update({
                where: { id: job.id },
                data: {
                    status: 'RELEASED',
                    cleanerId: null,
                    lastClaimedBy: job.cleanerId,
                    completionDeadline: null,
                    claimCount: newClaimCount
                }
            });
            console.log(`[JobAutoRelease] Job ${job.id} flagged for admin review (${newClaimCount} attempts)`);
        } else {
            // Release back to available
            await tx.job.update({
                where: { id: job.id },
                data: {
                    status: 'AVAILABLE',
                    cleanerId: null,
                    lastClaimedBy: job.cleanerId,
                    completionDeadline: null,
                    claimCount: newClaimCount
                }
            });
            console.log(`[JobAutoRelease] Job ${job.id} released back to AVAILABLE`);
        }

        // Record penalty for cleaner
        if (job.cleanerId) {
            await tx.cleanerPenalty.create({
                data: {
                    cleanerId: job.cleanerId,
                    jobId: job.id,
                    reason: 'MISSED_DEADLINE',
                    points: 1
                }
            });

            // Update cleaner profile
            const profile = await tx.cleanerProfile.findUnique({
                where: { userId: job.cleanerId }
            });

            if (profile) {
                const newPenalties = profile.penalties + 1;
                const newActiveJobs = Math.max(0, profile.activeJobs - 1);
                
                // Calculate new rating (decrease by 0.2 per penalty, min 1.0)
                const newRating = Math.max(1.0, profile.rating - 0.2);

                await tx.cleanerProfile.update({
                    where: { userId: job.cleanerId },
                    data: {
                        penalties: newPenalties,
                        activeJobs: newActiveJobs,
                        rating: newRating
                    }
                });

                // Suspend if too many penalties
                if (newPenalties >= MAX_PENALTIES_BEFORE_SUSPENSION) {
                    await tx.user.update({
                        where: { id: job.cleanerId },
                        data: {
                            isSuspended: true,
                            suspendedAt: new Date(),
                            suspendReason: 'Too many missed deadlines'
                        }
                    });
                    console.log(`[JobAutoRelease] Cleaner ${job.cleanerId} suspended due to penalties`);
                }
            }
        }
    });

    // Emit notification event
    if (job.cleanerId) {
        eventBus.emitEvent(EventTypes.JOB_AUTO_RELEASED, {
            jobId: job.id,
            campaignId: job.campaign.id,
            cleanerId: job.cleanerId,
            campaignTitle: job.campaign.title
        });
    }

    // Notify nearby cleaners if job is available again
    if (job.claimCount + 1 < MAX_CLAIM_ATTEMPTS) {
        eventBus.emitEvent(EventTypes.JOB_AVAILABLE, {
            jobId: job.id,
            campaignId: job.campaign.id,
            campaignTitle: job.campaign.title,
            location: job.campaign.location
        });
    }
}

/**
 * Send deadline reminders to cleaners
 * - 24 hours before deadline
 * - 1 hour before deadline
 */
async function sendDeadlineReminders() {
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in1Hour = new Date(now.getTime() + 60 * 60 * 1000);
    const in30Min = new Date(now.getTime() + 30 * 60 * 1000);

    // 24-hour reminders (jobs expiring in 23.5-24.5 hours)
    const jobs24h = await prisma.job.findMany({
        where: {
            status: 'CLAIMED',
            completionDeadline: {
                gte: new Date(in24Hours.getTime() - 30 * 60 * 1000),
                lt: new Date(in24Hours.getTime() + 30 * 60 * 1000)
            }
        },
        include: {
            campaign: { select: { title: true } }
        }
    });

    for (const job of jobs24h) {
        if (job.cleanerId) {
            eventBus.emitEvent(EventTypes.DEADLINE_REMINDER_24H, {
                jobId: job.id,
                cleanerId: job.cleanerId,
                campaignTitle: job.campaign.title
            });
        }
    }

    // 1-hour reminders (jobs expiring in 30min-1.5 hours)
    const jobs1h = await prisma.job.findMany({
        where: {
            status: 'CLAIMED',
            completionDeadline: {
                gte: in30Min,
                lt: new Date(in1Hour.getTime() + 30 * 60 * 1000)
            }
        },
        include: {
            campaign: { select: { title: true } }
        }
    });

    for (const job of jobs1h) {
        if (job.cleanerId) {
            eventBus.emitEvent(EventTypes.DEADLINE_REMINDER_1H, {
                jobId: job.id,
                cleanerId: job.cleanerId,
                campaignTitle: job.campaign.title
            });
        }
    }

    console.log(`[DeadlineReminders] Sent ${jobs24h.length} 24h reminders, ${jobs1h.length} 1h reminders`);
}

module.exports = {
    processJobAutoRelease,
    sendDeadlineReminders
};
