const express = require('express');
const { body } = require('express-validator');
const jobController = require('../controllers/jobController');
const { authenticateToken, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/available',
    authenticateToken,
    requireRole('CLEANER', 'ADMIN'),
    jobController.getAvailableJobs
);

router.get('/my-jobs',
    authenticateToken,
    requireRole('CLEANER', 'ADMIN'),
    jobController.getCleanerJobs
);

router.post('/:jobId/claim',
    authenticateToken,
    requireRole('CLEANER'),
    jobController.claimJob
);

router.post('/:jobId/complete',
    authenticateToken,
    requireRole('CLEANER'),
    upload.single('completionImage'),
    jobController.completeJob
);

// Unclaim a job
router.post('/:jobId/unclaim',
    authenticateToken,
    requireRole('CLEANER'),
    jobController.unclaimJob
);

// Get job by ID
router.get('/:jobId',
    authenticateToken,
    jobController.getJobById
);

module.exports = router;
