// backend/src/middleware/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'A record with this value already exists'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Record not found'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
      details: err.errors
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// ============================================

// backend/src/middleware/upload.js

const multer = require('multer');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;

// ============================================

// backend/src/services/storageService.js

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'cleanit-uploads';

exports.uploadToS3 = async (file) => {
  try {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `uploads/${Date.now()}-${fileName}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

exports.deleteFromS3 = async (fileUrl) => {
  try {
    const fileKey = fileUrl.split('.com/')[1];
    
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey
    };

    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};

// ============================================

// backend/src/routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.get('/campaigns', userController.getUserCampaigns);

module.exports = router;

// ============================================

// backend/src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true,
            contributions: true,
            jobs: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { name, phone, avatarUrl } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(avatarUrl && { avatarUrl })
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatarUrl: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserCampaigns = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const campaigns = await prisma.campaign.findMany({
      where: { creatorId: userId },
      include: {
        _count: {
          select: { contributions: true }
        },
        job: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ campaigns });
  } catch (error) {
    next(error);
  }
};

// ============================================

// backend/.env.example

PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cleanit"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=cleanit-uploads

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_ACCOUNT_NUMBER=your-account-number

# Platform Settings
PLATFORM_FEE_PERCENTAGE=5
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Redis (optional)
REDIS_URL=redis://localhost:6379