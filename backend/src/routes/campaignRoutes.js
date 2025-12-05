const express = require('express');
const { body } = require('express-validator');
const campaignController = require('../controllers/campaignController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', campaignController.getCampaigns);
router.get('/featured', campaignController.getFeaturedCampaigns);
router.get('/nearby', campaignController.getNearbyCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Protected routes
router.post('/',
    authenticateToken,
    upload.single('image'),
    [
        body('title').trim().notEmpty().isLength({ max: 200 }),
        body('description').optional().isLength({ max: 2000 }),
        body('location').trim().notEmpty(),
        body('targetAmount').isFloat({ min: 100 })
    ],
    campaignController.createCampaign
);

router.patch('/:id',
    authenticateToken,
    campaignController.updateCampaign
);

router.delete('/:id',
    authenticateToken,
    campaignController.deleteCampaign
);

// Cancel campaign
router.post('/:id/cancel',
    authenticateToken,
    campaignController.cancelCampaign
);

// Get user's own campaigns
router.get('/user/my-campaigns',
    authenticateToken,
    campaignController.getMyCampaigns
);

module.exports = router;
