const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');
const { authenticateToken } = require('../middleware/auth');

// Tip payment routes
router.post('/create-order', authenticateToken, tipController.createTipOrder);
router.post('/verify-payment', authenticateToken, tipController.verifyTipPayment);

// Tip history routes
router.get('/cleantip/:cleanTipId', authenticateToken, tipController.getCleanTipTips);
router.get('/my-sent', authenticateToken, tipController.getMySentTips);
router.get('/my-received', authenticateToken, tipController.getMyReceivedTips);
router.get('/my-stats', authenticateToken, tipController.getMyTipStats);

module.exports = router;
