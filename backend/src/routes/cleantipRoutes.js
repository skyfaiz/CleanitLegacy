const express = require('express');
const router = express.Router();
const cleantipController = require('../controllers/cleantipController');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public routes (authenticated users)
router.post('/', authenticateToken, cleantipController.createCleanTip);
router.get('/', authenticateToken, cleantipController.getAllCleanTips);
router.get('/my', authenticateToken, cleantipController.getMyCleanTips);
router.get('/:id', authenticateToken, cleantipController.getCleanTipById);
router.put('/:id', authenticateToken, cleantipController.updateCleanTip);
router.delete('/:id', authenticateToken, cleantipController.deleteCleanTip);

// Admin routes
router.get('/admin/all', authenticateToken, isAdmin, cleantipController.getAllCleanTipsForAdmin);
router.put('/admin/:id/status', authenticateToken, isAdmin, cleantipController.updateCleanTipStatus);

module.exports = router;
