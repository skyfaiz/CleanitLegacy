const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get notifications for the current user
 * Supports pagination and filtering by read status
 */
exports.getNotifications = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { 
            page = 1, 
            limit = 20, 
            unreadOnly = false 
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = Math.min(parseInt(limit), 50);
        const skip = (pageNum - 1) * limitNum;

        const where = {
            userId,
            ...(unreadOnly === 'true' && { read: false })
        };

        const [notifications, total, unreadCount] = await Promise.all([
            prisma.notification.findMany({
                where,
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.notification.count({ where }),
            prisma.notification.count({
                where: { userId, read: false }
            })
        ]);

        res.json({
            notifications,
            unreadCount,
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

/**
 * Get unread notification count
 */
exports.getUnreadCount = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const count = await prisma.notification.count({
            where: { userId, read: false }
        });

        res.json({ unreadCount: count });
    } catch (error) {
        next(error);
    }
};

/**
 * Mark a single notification as read
 */
exports.markAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { notificationId } = req.params;

        const notification = await prisma.notification.findUnique({
            where: { id: notificationId }
        });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        if (notification.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true }
        });

        res.json({ notification: updated });
    } catch (error) {
        next(error);
    }
};

/**
 * Mark all notifications as read for the current user
 */
exports.markAllAsRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const result = await prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true }
        });

        res.json({ 
            message: 'All notifications marked as read',
            count: result.count 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a notification
 */
exports.deleteNotification = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { notificationId } = req.params;

        const notification = await prisma.notification.findUnique({
            where: { id: notificationId }
        });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        if (notification.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.notification.delete({
            where: { id: notificationId }
        });

        res.json({ message: 'Notification deleted' });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete all read notifications for the current user
 */
exports.deleteAllRead = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const result = await prisma.notification.deleteMany({
            where: { userId, read: true }
        });

        res.json({ 
            message: 'All read notifications deleted',
            count: result.count 
        });
    } catch (error) {
        next(error);
    }
};
