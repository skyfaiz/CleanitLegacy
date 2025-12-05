const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.put('/profile', userController.updateProfile);
router.get('/campaigns', userController.getUserCampaigns);

module.exports = router;

