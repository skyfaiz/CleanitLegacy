const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
        body('name').trim().notEmpty(),
        body('phone').optional().trim(),
        body('role').optional().isIn(['CITIZEN', 'CLEANER'])
    ],
    authController.register
);

router.post('/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty()
    ],
    authController.login
);

router.post('/refresh', authController.refreshToken);

module.exports = router;
