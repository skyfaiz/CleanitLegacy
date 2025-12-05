const express = require('express');
const { body } = require('express-validator');
const contributionController = require('../controllers/contributionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order',
    authenticateToken,
    [
        body('campaignId').notEmpty(),
        body('amount').isFloat({ min: 10 })
    ],
    contributionController.createOrder
);

router.post('/verify',
    authenticateToken,
    [
        body('orderId').notEmpty(),
        body('paymentId').notEmpty(),
        body('signature').notEmpty(),
        body('campaignId').notEmpty(),
        body('amount').isFloat({ min: 10 })
    ],
    contributionController.verifyPayment
);

router.get('/user/:userId',
    authenticateToken,
    contributionController.getUserContributions
);

module.exports = router;
