const express = require('express');
const adminController = require('../controllers/adminController');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(requireRole('ADMIN'));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/financial-overview', adminController.getFinancialOverview);

// Users management
router.get('/users', adminController.getUsers);
router.put('/users/:userId/role', adminController.updateUserRole);
router.post('/users/:userId/suspend', adminController.suspendUser);
router.post('/users/:userId/unsuspend', adminController.unsuspendUser);

// Campaigns management
router.get('/campaigns', adminController.getCampaigns);
router.get('/campaigns/pending', adminController.getPendingCampaigns);
router.put('/campaigns/:campaignId/status', adminController.updateCampaignStatus);
router.post('/campaigns/:campaignId/approve', adminController.approveCampaign);

// Jobs management - Verification queue
router.get('/jobs', adminController.getJobs);
router.get('/jobs/pending', adminController.getPendingJobs);
router.get('/jobs/verification-queue', adminController.getVerificationQueue);
router.post('/jobs/:jobId/verify', adminController.verifyJob);
router.post('/jobs/:jobId/reject', adminController.rejectJob);
router.post('/jobs/:jobId/payout', adminController.processPayout);

module.exports = router;

