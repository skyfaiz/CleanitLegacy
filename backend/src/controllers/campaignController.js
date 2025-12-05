const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const { uploadToS3, generatePresignedUrl } = require('../services/storageService');

const prisma = new PrismaClient();

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

        if (!req.file) {
            return res.status(400).json({ error: 'Campaign image required' });
        }

        // Upload image to S3
        const imageUrl = await uploadToS3(req.file);

        const campaign = await prisma.campaign.create({
            data: {
                title,
                description,
                location,
                targetAmount: parseFloat(targetAmount),
                imageUrl,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                creatorId: userId
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

        res.status(201).json({
            message: 'Campaign created successfully',
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
