// backend/src/routes/jobRoutes.js

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

module.exports = router;

// ============================================

// backend/src/controllers/jobController.js

const { PrismaClient } = require('@prisma/client');
const { uploadToS3 } = require('../services/storageService');

const prisma = new PrismaClient();

exports.getAvailableJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where: { status: 'AVAILABLE' },
        skip,
        take: parseInt(limit),
        include: {
          campaign: {
            include: {
              creator: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.job.count({ where: { status: 'AVAILABLE' } })
    ]);

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCleanerJobs = async (req, res, next) => {
  try {
    const cleanerId = req.user.userId;
    const { status } = req.query;

    const where = {
      cleanerId,
      ...(status && { status })
    };

    const jobs = await prisma.job.findMany({
      where,
      include: {
        campaign: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

exports.claimJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const cleanerId = req.user.userId;

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'AVAILABLE') {
      return res.status(400).json({ error: 'Job is not available' });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'CLAIMED',
        cleanerId
      },
      include: {
        campaign: true
      }
    });

    res.json({
      message: 'Job claimed successfully',
      job: updatedJob
    });
  } catch (error) {
    next(error);
  }
};

exports.completeJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const cleanerId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ error: 'Completion image required' });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.cleanerId !== cleanerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (job.status !== 'CLAIMED') {
      return res.status(400).json({ error: 'Job cannot be completed' });
    }

    // Upload completion image
    const imageUrl = await uploadToS3(req.file);

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        completionImageUrl: imageUrl,
        completedAt: new Date()
      },
      include: {
        campaign: true
      }
    });

    res.json({
      message: 'Job marked as completed. Awaiting verification.',
      job: updatedJob
    });
  } catch (error) {
    next(error);
  }
};

// ============================================

// backend/src/routes/adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(requireRole('ADMIN'));

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/jobs/pending', adminController.getPendingJobs);
router.post('/jobs/:jobId/verify', adminController.verifyJob);
router.post('/jobs/:jobId/reject', adminController.rejectJob);

module.exports = router;

// ============================================

// backend/src/controllers/adminController.js

const { PrismaClient } = require('@prisma/client');
const paymentService = require('../services/paymentService');

const prisma = new PrismaClient();

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalCampaigns,
      activeCampaigns,
      totalContributions,
      totalAmount,
      pendingJobs,
      completedJobs
    ] = await Promise.all([
      prisma.campaign.count(),
      prisma.campaign.count({ where: { status: 'ACTIVE' } }),
      prisma.contribution.count(),
      prisma.contribution.aggregate({
        _sum: { amount: true }
      }),
      prisma.job.count({ where: { status: 'COMPLETED' } }),
      prisma.job.count({ where: { status: 'VERIFIED' } })
    ]);

    res.json({
      stats: {
        totalCampaigns,
        activeCampaigns,
        totalContributions,
        totalAmount: totalAmount._sum.amount || 0,
        pendingJobs,
        completedJobs
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getPendingJobs = async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'COMPLETED' },
      include: {
        campaign: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        cleaner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: { completedAt: 'asc' }
    });

    res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

exports.verifyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        campaign: true,
        cleaner: true
      }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Job is not completed' });
    }

    // Calculate payout amount
    const campaignAmount = job.campaign.amountRaised;
    const payoutAmount = paymentService.calculateCleanerPayout(campaignAmount);

    // TODO: Implement actual payout logic with Razorpay
    // For MVP, we'll just mark as verified
    const updatedJob = await prisma.$transaction(async (tx) => {
      // Update job status
      const verifiedJob = await tx.job.update({
        where: { id: jobId },
        data: {
          status: 'VERIFIED',
          verifiedAt: new Date(),
          payoutAmount
        }
      });

      // Update campaign status
      await tx.campaign.update({
        where: { id: job.campaignId },
        data: { status: 'COMPLETED' }
      });

      return verifiedJob;
    });

    // In production, trigger payout here
    // const payout = await paymentService.createPayout(
    //   job.cleanerId,
    //   payoutAmount,
    //   job.cleaner.accountDetails
    // );

    res.json({
      message: 'Job verified successfully',
      job: updatedJob,
      payoutAmount
    });
  } catch (error) {
    next(error);
  }
};

exports.rejectJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { reason } = req.body;

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Job is not completed' });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'CLAIMED', // Return to claimed status
        completionImageUrl: null,
        completedAt: null
      }
    });

    // TODO: Send notification to cleaner about rejection

    res.json({
      message: 'Job rejected',
      job: updatedJob,
      reason
    });
  } catch (error) {
    next(error);
  }
};