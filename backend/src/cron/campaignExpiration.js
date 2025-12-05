const { PrismaClient } = require('@prisma/client');
const { eventBus, EventTypes } = require('../services/eventBus');

const prisma = new PrismaClient();

/**
 * Process expired campaigns
 * - Campaigns that have passed their expiresAt date
 * - If >= 80% funded: Convert to FUNDED and create job
 * - If < 80% funded: Mark as EXPIRED and initiate refunds
 */
async function processCampaignExpiration() {
    const now = new Date();
    
    // Find active campaigns that have expired
    const expiredCampaigns = await prisma.campaign.findMany({
        where: {
            status: 'ACTIVE',
            expiresAt: {
                lt: now
            }
        },
        include: {
            contributions: {
                where: { status: 'SUCCESS' },
                select: { userId: true }
            },
            creator: {
                select: { id: true, name: true }
            }
        }
    });

    console.log(`[CampaignExpiration] Found ${expiredCampaigns.length} expired campaigns`);

    for (const campaign of expiredCampaigns) {
        try {
            const fundingPercentage = (campaign.amountRaised / campaign.targetAmount) * 100;
            const contributorIds = [...new Set(campaign.contributions.map(c => c.userId))];

            if (fundingPercentage >= 80) {
                // Convert to FUNDED - create job with adjusted amount
                await handlePartiallyFundedCampaign(campaign, contributorIds);
            } else {
                // Mark as EXPIRED - initiate refunds
                await handleExpiredCampaign(campaign, contributorIds);
            }
        } catch (error) {
            console.error(`[CampaignExpiration] Error processing campaign ${campaign.id}:`, error);
        }
    }
}

/**
 * Handle campaigns that are >= 80% funded
 * Create job with the raised amount
 */
async function handlePartiallyFundedCampaign(campaign, contributorIds) {
    const jobAmount = campaign.amountRaised * 0.95; // 95% to cleaner
    const platformFee = campaign.amountRaised * 0.05; // 5% platform fee

    await prisma.$transaction(async (tx) => {
        // Update campaign status
        await tx.campaign.update({
            where: { id: campaign.id },
            data: { status: 'FUNDED' }
        });

        // Create job
        const job = await tx.job.create({
            data: {
                campaignId: campaign.id,
                status: 'AVAILABLE',
                amount: jobAmount,
                platformFee: platformFee,
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
            }
        });

        console.log(`[CampaignExpiration] Campaign ${campaign.id} converted to FUNDED, job ${job.id} created`);
    });

    // Emit events
    eventBus.emitEvent(EventTypes.CAMPAIGN_FUNDED, {
        campaignId: campaign.id,
        creatorId: campaign.creatorId,
        campaignTitle: campaign.title,
        targetAmount: campaign.amountRaised,
        contributorIds
    });

    eventBus.emitEvent(EventTypes.JOB_AVAILABLE, {
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        amount: campaign.amountRaised * 0.95,
        location: campaign.location,
        latitude: campaign.latitude,
        longitude: campaign.longitude
    });
}

/**
 * Handle campaigns that are < 80% funded
 * Mark as expired and queue refunds
 */
async function handleExpiredCampaign(campaign, contributorIds) {
    await prisma.$transaction(async (tx) => {
        // Update campaign status
        await tx.campaign.update({
            where: { id: campaign.id },
            data: {
                status: 'EXPIRED',
                refundStatus: 'PENDING'
            }
        });

        // Mark all contributions for refund
        await tx.contribution.updateMany({
            where: {
                campaignId: campaign.id,
                status: 'SUCCESS',
                refundStatus: null
            },
            data: {
                refundStatus: 'PENDING'
            }
        });

        console.log(`[CampaignExpiration] Campaign ${campaign.id} marked as EXPIRED, refunds queued`);
    });

    // Emit event
    eventBus.emitEvent(EventTypes.CAMPAIGN_EXPIRED, {
        campaignId: campaign.id,
        creatorId: campaign.creatorId,
        campaignTitle: campaign.title,
        contributorIds
    });
}

/**
 * Calculate expiration date based on target amount
 * ₹500-2000: 30 days
 * ₹2001-10000: 45 days
 * ₹10001+: 60 days
 */
function calculateExpirationDate(targetAmount) {
    let days;
    if (targetAmount <= 2000) {
        days = 30;
    } else if (targetAmount <= 10000) {
        days = 45;
    } else {
        days = 60;
    }
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

module.exports = {
    processCampaignExpiration,
    calculateExpirationDate
};
