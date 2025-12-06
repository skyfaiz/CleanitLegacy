const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const { uploadToS3, generatePresignedUrl } = require('../services/storageService');
const { eventBus, EventTypes } = require('../services/eventBus');
const { calculateExpirationDate } = require('../cron/campaignExpiration');

const prisma = new PrismaClient();

// Validation constants
const VALIDATION = {
    TITLE_MIN: 10,
    TITLE_MAX: 100,
    DESCRIPTION_MIN: 50,
    DESCRIPTION_MAX: 1000,
    TARGET_MIN: 500,
    TARGET_MAX: 50000,
    MAX_CAMPAIGNS_SAME_LOCATION: 3,
    LOCATION_RADIUS_KM: 0.5 // 500 meters
};

exports.getCampaigns = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = 'createdAt',
            order = 'desc',
            status = 'ACTIVE',
            platform = 'mobile'
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = platform === 'web' ? Math.min(parseInt(limit), 20) : Math.min(parseInt(limit), 10);
        const skip = (pageNum - 1) * limitNum;

        const where = status ? { status } : {};

        const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                skip,
                take: limitNum,
                orderBy: { [sort]: order },
                include: {
                    creator: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true
                        }
                    },
                    _count: {
                        select: { contributions: true }
                    }
                }
            }),
            prisma.campaign.count({ where })
        ]);

        // Generate presigned URLs
        await Promise.all(campaigns.map(async (campaign) => {
            if (campaign.imageUrl) {
                campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
            }
        }));

        res.json({
            campaigns,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getFeaturedCampaigns = async (req, res, next) => {
    try {
        const campaigns = await prisma.campaign.findMany({
            where: {
                status: 'ACTIVE',
                amountRaised: {
                    gte: prisma.raw('target_amount * 0.5') // At least 50% funded
                }
            },
            take: 6,
            orderBy: { amountRaised: 'desc' },
            include: {
                creator: {
                    select: { id: true, name: true, avatarUrl: true }
                },
                _count: {
                    select: { contributions: true }
                }
            }
        });

        // Generate presigned URLs
        await Promise.all(campaigns.map(async (campaign) => {
            if (campaign.imageUrl) {
                campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
            }
        }));

        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};

exports.getNearbyCampaigns = async (req, res, next) => {
    try {
        const { lat, lng, radius = 10 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: 'Latitude and longitude required' });
        }

        // Simple distance calculation (for MVP, use PostGIS for production)
        const campaigns = await prisma.campaign.findMany({
            where: {
                status: 'ACTIVE',
                latitude: { not: null },
                longitude: { not: null }
            },
            include: {
                creator: {
                    select: { id: true, name: true, avatarUrl: true }
                }
            }
        });

        // Generate presigned URLs
        await Promise.all(campaigns.map(async (campaign) => {
            if (campaign.imageUrl) {
                campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
            }
        }));

        // Filter by distance (rough calculation)
        const nearby = campaigns.filter(c => {
            const distance = getDistanceFromLatLonInKm(
                parseFloat(lat),
                parseFloat(lng),
                c.latitude,
                c.longitude
            );
            return distance <= parseFloat(radius);
        });

        res.json({ campaigns: nearby });
    } catch (error) {
        next(error);
    }
};

exports.getCampaignById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true
                    }
                },
                contributions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                },
                job: true,
                _count: {
                    select: { contributions: true }
                }
            }
        });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Generate presigned URL
        if (campaign.imageUrl) {
            campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
        }

        // Generate presigned URL for job completion image if exists
        if (campaign.job && campaign.job.completionImageUrl) {
            campaign.job.completionImageUrl = await generatePresignedUrl(campaign.job.completionImageUrl);
        }

        res.json({ campaign });
    } catch (error) {
        next(error);
    }
};

exports.createCampaign = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, location, targetAmount, latitude, longitude } = req.body;
        const userId = req.user.userId;
        const parsedTarget = parseFloat(targetAmount);

        // Validate location coordinates (required for new campaigns)
        const parsedLat = latitude ? parseFloat(latitude) : null;
        const parsedLng = longitude ? parseFloat(longitude) : null;

        if (!parsedLat || !parsedLng) {
            return res.status(400).json({ 
                error: 'Location coordinates (latitude and longitude) are required. Please select a location on the map.' 
            });
        }

        if (parsedLat < -90 || parsedLat > 90) {
            return res.status(400).json({ error: 'Invalid latitude value' });
        }

        if (parsedLng < -180 || parsedLng > 180) {
            return res.status(400).json({ error: 'Invalid longitude value' });
        }

        // Enhanced validation
        if (title.length < VALIDATION.TITLE_MIN || title.length > VALIDATION.TITLE_MAX) {
            return res.status(400).json({ 
                error: `Title must be between ${VALIDATION.TITLE_MIN} and ${VALIDATION.TITLE_MAX} characters` 
            });
        }

        if (description && (description.length < VALIDATION.DESCRIPTION_MIN || description.length > VALIDATION.DESCRIPTION_MAX)) {
            return res.status(400).json({ 
                error: `Description must be between ${VALIDATION.DESCRIPTION_MIN} and ${VALIDATION.DESCRIPTION_MAX} characters` 
            });
        }

        if (parsedTarget < VALIDATION.TARGET_MIN || parsedTarget > VALIDATION.TARGET_MAX) {
            return res.status(400).json({ 
                error: `Target amount must be between ₹${VALIDATION.TARGET_MIN} and ₹${VALIDATION.TARGET_MAX}` 
            });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Campaign image required' });
        }

        // Spam detection: Check for too many campaigns from same location
        const nearbyCampaigns = await prisma.campaign.findMany({
            where: {
                creatorId: userId,
                status: { in: ['ACTIVE', 'DRAFT'] },
                latitude: { not: null },
                longitude: { not: null }
            }
        });

        const campaignsAtLocation = nearbyCampaigns.filter(c => {
            const distance = getDistanceFromLatLonInKm(
                parsedLat,
                parsedLng,
                c.latitude,
                c.longitude
            );
            return distance <= VALIDATION.LOCATION_RADIUS_KM;
        });

        if (campaignsAtLocation.length >= VALIDATION.MAX_CAMPAIGNS_SAME_LOCATION) {
            return res.status(400).json({ 
                error: 'Too many campaigns from this location. Please wait for existing campaigns to complete.' 
            });
        }

        // Check if first-time user (needs admin approval)
        const userCampaignCount = await prisma.campaign.count({
            where: { 
                creatorId: userId,
                status: { in: ['ACTIVE', 'FUNDED', 'COMPLETED'] }
            }
        });
        const isFirstTime = userCampaignCount === 0;

        // Upload image to S3
        const imageUrl = await uploadToS3(req.file);

        // Calculate expiration date based on target amount
        const expiresAt = calculateExpirationDate(parsedTarget);

        const campaign = await prisma.campaign.create({
            data: {
                title,
                description,
                location,
                targetAmount: parsedTarget,
                imageUrl,
                latitude: parsedLat,
                longitude: parsedLng,
                creatorId: userId,
                expiresAt,
                isFirstTime,
                status: isFirstTime ? 'DRAFT' : 'ACTIVE' // First-time users need approval
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                }
            }
        });

        // Generate presigned URL for response
        if (campaign.imageUrl) {
            campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
        }

        // Emit event for notifications
        eventBus.emitEvent(EventTypes.CAMPAIGN_CREATED, {
            campaignId: campaign.id,
            creatorId: userId,
            campaignTitle: campaign.title,
            isFirstTime
        });

        res.status(201).json({
            message: isFirstTime 
                ? 'Campaign created and pending admin approval' 
                : 'Campaign created successfully',
            campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { title, description, status } = req.body;

        // Check ownership
        const campaign = await prisma.campaign.findUnique({
            where: { id }
        });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        if (campaign.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized to update this campaign' });
        }

        const updated = await prisma.campaign.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(status && { status })
            }
        });

        res.json({
            message: 'Campaign updated successfully',
            campaign: updated
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const campaign = await prisma.campaign.findUnique({
            where: { id }
        });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        if (campaign.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized to delete this campaign' });
        }

        await prisma.campaign.delete({ where: { id } });

        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Helper function
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Cancel a campaign
 * User can only cancel if no funds raised
 * Admin can cancel any campaign (triggers refunds if needed)
 */
exports.cancelCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const userId = req.user.userId;
        const isAdmin = req.user.role === 'ADMIN';

        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: {
                contributions: {
                    where: { status: 'SUCCESS' },
                    select: { userId: true }
                }
            }
        });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Check authorization
        if (campaign.creatorId !== userId && !isAdmin) {
            return res.status(403).json({ error: 'Not authorized to cancel this campaign' });
        }

        // Check if campaign can be cancelled
        if (campaign.status === 'COMPLETED') {
            return res.status(400).json({ error: 'Cannot cancel a completed campaign' });
        }

        // Non-admin users can only cancel if no funds raised
        if (!isAdmin && campaign.amountRaised > 0) {
            return res.status(400).json({ 
                error: 'Cannot cancel campaign with contributions. Contact support for assistance.' 
            });
        }

        const contributorIds = [...new Set(campaign.contributions.map(c => c.userId))];
        const hasContributions = campaign.amountRaised > 0;

        await prisma.$transaction(async (tx) => {
            // Update campaign status
            await tx.campaign.update({
                where: { id },
                data: {
                    status: 'CANCELLED',
                    cancelledAt: new Date(),
                    cancelReason: reason || 'Cancelled by user',
                    refundStatus: hasContributions ? 'PENDING' : null
                }
            });

            // If there are contributions, mark them for refund
            if (hasContributions) {
                await tx.contribution.updateMany({
                    where: {
                        campaignId: id,
                        status: 'SUCCESS',
                        refundStatus: null
                    },
                    data: {
                        refundStatus: 'PENDING'
                    }
                });
            }
        });

        // Emit cancellation event
        eventBus.emitEvent(EventTypes.CAMPAIGN_CANCELLED, {
            campaignId: id,
            creatorId: campaign.creatorId,
            campaignTitle: campaign.title,
            contributorIds,
            cancelledBy: isAdmin ? 'admin' : 'creator',
            reason
        });

        res.json({ 
            message: hasContributions 
                ? 'Campaign cancelled. Refunds will be processed within 5-7 business days.'
                : 'Campaign cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user's own campaigns
 */
exports.getMyCampaigns = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { status } = req.query;

        const where = {
            creatorId: userId,
            ...(status && { status })
        };

        const campaigns = await prisma.campaign.findMany({
            where,
            include: {
                _count: {
                    select: { contributions: true }
                },
                job: {
                    select: {
                        id: true,
                        status: true,
                        cleanerId: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Generate presigned URLs
        await Promise.all(campaigns.map(async (campaign) => {
            if (campaign.imageUrl) {
                campaign.imageUrl = await generatePresignedUrl(campaign.imageUrl);
            }
        }));

        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};
