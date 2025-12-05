const { PrismaClient } = require('@prisma/client');
const { eventBus, EventTypes } = require('./eventBus');

const prisma = new PrismaClient();

/**
 * Notification templates for different event types
 */
const NotificationTemplates = {
    [EventTypes.CAMPAIGN_CREATED]: {
        title: 'Campaign Created',
        message: (data) => `Your campaign "${data.campaignTitle}" has been created and is pending approval.`
    },
    [EventTypes.CAMPAIGN_APPROVED]: {
        title: 'Campaign Approved',
        message: (data) => `Your campaign "${data.campaignTitle}" has been approved and is now live!`
    },
    [EventTypes.CAMPAIGN_FUNDED]: {
        title: 'Campaign Fully Funded!',
        message: (data) => `Great news! Campaign "${data.campaignTitle}" has reached its funding goal of ₹${data.targetAmount}!`
    },
    [EventTypes.CAMPAIGN_CONTRIBUTION]: {
        title: 'New Contribution',
        message: (data) => `${data.contributorName || 'Someone'} contributed ₹${data.amount} to your campaign "${data.campaignTitle}".`
    },
    [EventTypes.CAMPAIGN_EXPIRED]: {
        title: 'Campaign Expired',
        message: (data) => `Campaign "${data.campaignTitle}" has expired. Refunds will be processed.`
    },
    [EventTypes.CAMPAIGN_CANCELLED]: {
        title: 'Campaign Cancelled',
        message: (data) => `Campaign "${data.campaignTitle}" has been cancelled.`
    },
    [EventTypes.JOB_AVAILABLE]: {
        title: 'New Job Available',
        message: (data) => `A new cleaning job is available near you! Earn ₹${data.amount}.`
    },
    [EventTypes.JOB_CLAIMED]: {
        title: 'Job Claimed',
        message: (data) => `A cleaner has claimed your campaign "${data.campaignTitle}". Cleaning will begin soon!`
    },
    [EventTypes.JOB_COMPLETED]: {
        title: 'Job Completed',
        message: (data) => `The cleaning job for "${data.campaignTitle}" has been completed and is pending verification.`
    },
    [EventTypes.JOB_VERIFIED]: {
        title: 'Job Verified',
        message: (data) => `Your job has been verified! Payment of ₹${data.amount} will be processed within 24 hours.`
    },
    [EventTypes.JOB_REJECTED]: {
        title: 'Job Submission Rejected',
        message: (data) => `Your job submission was not approved. Reason: ${data.reason}. ${data.retryAllowed ? 'Please re-submit with a new photo.' : ''}`
    },
    [EventTypes.JOB_AUTO_RELEASED]: {
        title: 'Job Auto-Released',
        message: (data) => `Job for "${data.campaignTitle}" was released due to missed deadline. This affects your completion rate.`
    },
    [EventTypes.JOB_UNCLAIMED]: {
        title: 'Job Unclaimed',
        message: (data) => `The cleaner has unclaimed the job for "${data.campaignTitle}". Looking for another cleaner.`
    },
    [EventTypes.PAYOUT_SUCCESS]: {
        title: 'Payment Received',
        message: (data) => `₹${data.amount} has been credited to your bank account for job "${data.campaignTitle}".`
    },
    [EventTypes.PAYOUT_FAILED]: {
        title: 'Payment Failed',
        message: (data) => `Payment of ₹${data.amount} failed. Please update your bank details. Our team will contact you.`
    },
    [EventTypes.REFUND_PROCESSED]: {
        title: 'Refund Processed',
        message: (data) => `Your refund of ₹${data.amount} for campaign "${data.campaignTitle}" has been processed.`
    },
    [EventTypes.DEADLINE_REMINDER_24H]: {
        title: 'Deadline Reminder',
        message: (data) => `Reminder: Complete your job for "${data.campaignTitle}" within 24 hours.`
    },
    [EventTypes.DEADLINE_REMINDER_1H]: {
        title: 'Urgent: 1 Hour Left',
        message: (data) => `Urgent: Only 1 hour left to complete your job for "${data.campaignTitle}"!`
    },
    [EventTypes.VERIFICATION_NEEDED]: {
        title: 'Verification Needed',
        message: (data) => `New job completion pending verification for "${data.campaignTitle}".`
    }
};

/**
 * Create an in-app notification for a user
 * @param {object} params - Notification parameters
 * @param {string} params.userId - Target user ID
 * @param {string} params.type - Event type from EventTypes
 * @param {string} params.title - Notification title
 * @param {string} params.message - Notification message
 * @param {object} params.data - Additional context data
 */
async function createNotification({ userId, type, title, message, data }) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                data: data || {}
            }
        });
        console.log(`[NotificationService] Created notification for user ${userId}: ${type}`);
        return notification;
    } catch (error) {
        console.error('[NotificationService] Error creating notification:', error);
        throw error;
    }
}

/**
 * Create notifications for multiple users
 * @param {string[]} userIds - Array of user IDs
 * @param {string} type - Event type
 * @param {object} data - Event data for template
 */
async function notifyUsers(userIds, type, data) {
    const template = NotificationTemplates[type];
    if (!template) {
        console.warn(`[NotificationService] No template for event type: ${type}`);
        return;
    }

    const notifications = userIds.map(userId => ({
        userId,
        type,
        title: template.title,
        message: template.message(data),
        data
    }));

    try {
        await prisma.notification.createMany({
            data: notifications
        });
        console.log(`[NotificationService] Created ${notifications.length} notifications for ${type}`);
    } catch (error) {
        console.error('[NotificationService] Error creating bulk notifications:', error);
    }
}

/**
 * Get all admin user IDs for admin notifications
 */
async function getAdminUserIds() {
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN', isActive: true },
        select: { id: true }
    });
    return admins.map(a => a.id);
}

// ============================================
// EVENT LISTENERS (In-App Only)
// ============================================

// Campaign Created - Notify admins if first-time user
eventBus.on(EventTypes.CAMPAIGN_CREATED, async (payload) => {
    const { campaignId, creatorId, campaignTitle, isFirstTime } = payload;
    
    // Notify creator
    await createNotification({
        userId: creatorId,
        type: EventTypes.CAMPAIGN_CREATED,
        title: NotificationTemplates[EventTypes.CAMPAIGN_CREATED].title,
        message: NotificationTemplates[EventTypes.CAMPAIGN_CREATED].message({ campaignTitle }),
        data: { campaignId }
    });

    // Notify admins if first-time user needs approval
    if (isFirstTime) {
        const adminIds = await getAdminUserIds();
        await notifyUsers(adminIds, EventTypes.VERIFICATION_NEEDED, {
            campaignId,
            campaignTitle,
            message: `New campaign from first-time user needs approval`
        });
    }
});

// Campaign Approved
eventBus.on(EventTypes.CAMPAIGN_APPROVED, async (payload) => {
    const { campaignId, creatorId, campaignTitle } = payload;
    await createNotification({
        userId: creatorId,
        type: EventTypes.CAMPAIGN_APPROVED,
        title: NotificationTemplates[EventTypes.CAMPAIGN_APPROVED].title,
        message: NotificationTemplates[EventTypes.CAMPAIGN_APPROVED].message({ campaignTitle }),
        data: { campaignId }
    });
});

// Campaign Funded
eventBus.on(EventTypes.CAMPAIGN_FUNDED, async (payload) => {
    const { campaignId, creatorId, campaignTitle, targetAmount, contributorIds } = payload;
    
    // Notify creator
    await createNotification({
        userId: creatorId,
        type: EventTypes.CAMPAIGN_FUNDED,
        title: NotificationTemplates[EventTypes.CAMPAIGN_FUNDED].title,
        message: NotificationTemplates[EventTypes.CAMPAIGN_FUNDED].message({ campaignTitle, targetAmount }),
        data: { campaignId }
    });

    // Notify all contributors
    if (contributorIds && contributorIds.length > 0) {
        await notifyUsers(contributorIds, EventTypes.CAMPAIGN_FUNDED, {
            campaignId,
            campaignTitle,
            targetAmount
        });
    }
});

// Campaign Contribution
eventBus.on(EventTypes.CAMPAIGN_CONTRIBUTION, async (payload) => {
    const { campaignId, creatorId, campaignTitle, contributorName, amount } = payload;
    await createNotification({
        userId: creatorId,
        type: EventTypes.CAMPAIGN_CONTRIBUTION,
        title: NotificationTemplates[EventTypes.CAMPAIGN_CONTRIBUTION].title,
        message: NotificationTemplates[EventTypes.CAMPAIGN_CONTRIBUTION].message({ campaignTitle, contributorName, amount }),
        data: { campaignId, amount }
    });
});

// Campaign Expired
eventBus.on(EventTypes.CAMPAIGN_EXPIRED, async (payload) => {
    const { campaignId, creatorId, campaignTitle, contributorIds } = payload;
    
    // Notify creator
    await createNotification({
        userId: creatorId,
        type: EventTypes.CAMPAIGN_EXPIRED,
        title: NotificationTemplates[EventTypes.CAMPAIGN_EXPIRED].title,
        message: NotificationTemplates[EventTypes.CAMPAIGN_EXPIRED].message({ campaignTitle }),
        data: { campaignId }
    });

    // Notify contributors about refund
    if (contributorIds && contributorIds.length > 0) {
        await notifyUsers(contributorIds, EventTypes.CAMPAIGN_EXPIRED, {
            campaignId,
            campaignTitle
        });
    }
});

// Job Claimed - Notify campaign creator
eventBus.on(EventTypes.JOB_CLAIMED, async (payload) => {
    const { jobId, campaignId, creatorId, campaignTitle, cleanerName } = payload;
    await createNotification({
        userId: creatorId,
        type: EventTypes.JOB_CLAIMED,
        title: NotificationTemplates[EventTypes.JOB_CLAIMED].title,
        message: NotificationTemplates[EventTypes.JOB_CLAIMED].message({ campaignTitle }),
        data: { jobId, campaignId, cleanerName }
    });
});

// Job Completed - Notify creator and admins
eventBus.on(EventTypes.JOB_COMPLETED, async (payload) => {
    const { jobId, campaignId, creatorId, campaignTitle, cleanerId } = payload;
    
    // Notify creator
    await createNotification({
        userId: creatorId,
        type: EventTypes.JOB_COMPLETED,
        title: NotificationTemplates[EventTypes.JOB_COMPLETED].title,
        message: NotificationTemplates[EventTypes.JOB_COMPLETED].message({ campaignTitle }),
        data: { jobId, campaignId }
    });

    // Notify admins for verification
    const adminIds = await getAdminUserIds();
    await notifyUsers(adminIds, EventTypes.VERIFICATION_NEEDED, {
        jobId,
        campaignId,
        campaignTitle
    });
});

// Job Verified - Notify cleaner and creator
eventBus.on(EventTypes.JOB_VERIFIED, async (payload) => {
    const { jobId, campaignId, cleanerId, creatorId, campaignTitle, amount } = payload;
    
    // Notify cleaner
    await createNotification({
        userId: cleanerId,
        type: EventTypes.JOB_VERIFIED,
        title: NotificationTemplates[EventTypes.JOB_VERIFIED].title,
        message: NotificationTemplates[EventTypes.JOB_VERIFIED].message({ amount }),
        data: { jobId, campaignId, amount }
    });

    // Notify creator
    await createNotification({
        userId: creatorId,
        type: EventTypes.JOB_VERIFIED,
        title: 'Campaign Verified Complete',
        message: `Your campaign "${campaignTitle}" has been verified as complete. Thank you for making your community cleaner!`,
        data: { jobId, campaignId }
    });
});

// Job Rejected - Notify cleaner
eventBus.on(EventTypes.JOB_REJECTED, async (payload) => {
    const { jobId, campaignId, cleanerId, reason, retryAllowed } = payload;
    await createNotification({
        userId: cleanerId,
        type: EventTypes.JOB_REJECTED,
        title: NotificationTemplates[EventTypes.JOB_REJECTED].title,
        message: NotificationTemplates[EventTypes.JOB_REJECTED].message({ reason, retryAllowed }),
        data: { jobId, campaignId, reason, retryAllowed }
    });
});

// Job Auto-Released - Notify cleaner
eventBus.on(EventTypes.JOB_AUTO_RELEASED, async (payload) => {
    const { jobId, campaignId, cleanerId, campaignTitle } = payload;
    await createNotification({
        userId: cleanerId,
        type: EventTypes.JOB_AUTO_RELEASED,
        title: NotificationTemplates[EventTypes.JOB_AUTO_RELEASED].title,
        message: NotificationTemplates[EventTypes.JOB_AUTO_RELEASED].message({ campaignTitle }),
        data: { jobId, campaignId }
    });
});

// Payout Success - Notify cleaner
eventBus.on(EventTypes.PAYOUT_SUCCESS, async (payload) => {
    const { payoutId, jobId, cleanerId, amount, campaignTitle } = payload;
    await createNotification({
        userId: cleanerId,
        type: EventTypes.PAYOUT_SUCCESS,
        title: NotificationTemplates[EventTypes.PAYOUT_SUCCESS].title,
        message: NotificationTemplates[EventTypes.PAYOUT_SUCCESS].message({ amount, campaignTitle }),
        data: { payoutId, jobId, amount }
    });
});

// Payout Failed - Notify cleaner and admins
eventBus.on(EventTypes.PAYOUT_FAILED, async (payload) => {
    const { payoutId, jobId, cleanerId, amount } = payload;
    
    await createNotification({
        userId: cleanerId,
        type: EventTypes.PAYOUT_FAILED,
        title: NotificationTemplates[EventTypes.PAYOUT_FAILED].title,
        message: NotificationTemplates[EventTypes.PAYOUT_FAILED].message({ amount }),
        data: { payoutId, jobId, amount }
    });

    // Notify admins
    const adminIds = await getAdminUserIds();
    await notifyUsers(adminIds, EventTypes.ADMIN_ACTION_REQUIRED, {
        type: 'PAYOUT_FAILED',
        payoutId,
        cleanerId,
        amount
    });
});

// Refund Processed - Notify contributor
eventBus.on(EventTypes.REFUND_PROCESSED, async (payload) => {
    const { contributionId, userId, amount, campaignTitle } = payload;
    await createNotification({
        userId,
        type: EventTypes.REFUND_PROCESSED,
        title: NotificationTemplates[EventTypes.REFUND_PROCESSED].title,
        message: NotificationTemplates[EventTypes.REFUND_PROCESSED].message({ amount, campaignTitle }),
        data: { contributionId, amount }
    });
});

// Deadline Reminders
eventBus.on(EventTypes.DEADLINE_REMINDER_24H, async (payload) => {
    const { jobId, cleanerId, campaignTitle } = payload;
    await createNotification({
        userId: cleanerId,
        type: EventTypes.DEADLINE_REMINDER_24H,
        title: NotificationTemplates[EventTypes.DEADLINE_REMINDER_24H].title,
        message: NotificationTemplates[EventTypes.DEADLINE_REMINDER_24H].message({ campaignTitle }),
        data: { jobId }
    });
});

eventBus.on(EventTypes.DEADLINE_REMINDER_1H, async (payload) => {
    const { jobId, cleanerId, campaignTitle } = payload;
    await createNotification({
        userId: cleanerId,
        type: EventTypes.DEADLINE_REMINDER_1H,
        title: NotificationTemplates[EventTypes.DEADLINE_REMINDER_1H].title,
        message: NotificationTemplates[EventTypes.DEADLINE_REMINDER_1H].message({ campaignTitle }),
        data: { jobId }
    });
});

module.exports = {
    createNotification,
    notifyUsers,
    getAdminUserIds,
    NotificationTemplates
};
