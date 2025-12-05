const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Get notifications with pagination
router.get('/', notificationController.getNotifications);

// Get unread count only
router.get('/unread-count', notificationController.getUnreadCount);

// Mark single notification as read
router.post('/:notificationId/read', notificationController.markAsRead);

// Mark all notifications as read
router.post('/read-all', notificationController.markAllAsRead);

// Delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

// Delete all read notifications
router.delete('/read/all', notificationController.deleteAllRead);

module.exports = router;
