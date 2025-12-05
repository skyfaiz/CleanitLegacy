const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatarUrl: true,
                createdAt: true,
                _count: {
                    select: {
                        campaigns: true,
                        contributions: true,
                        jobs: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { name, phone, avatarUrl } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(phone && { phone }),
                ...(avatarUrl && { avatarUrl })
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatarUrl: true
            }
        });

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserCampaigns = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const campaigns = await prisma.campaign.findMany({
            where: { creatorId: userId },
            include: {
                _count: {
                    select: { contributions: true }
                },
                job: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};
