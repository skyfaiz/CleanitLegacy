const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Razorpay webhook - no auth middleware (uses signature verification)
router.post('/razorpay', webhookController.handleRazorpayWebhook);

module.exports = router;
