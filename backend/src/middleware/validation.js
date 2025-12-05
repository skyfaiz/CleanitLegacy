const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Campaign validation rules
 */
const campaignValidation = {
    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 10, max: 100 }).withMessage('Title must be 10-100 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ min: 50, max: 1000 }).withMessage('Description must be 50-1000 characters'),
        body('location')
            .trim()
            .notEmpty().withMessage('Location is required'),
        body('targetAmount')
            .isFloat({ min: 500, max: 50000 }).withMessage('Target amount must be ₹500-₹50,000'),
        body('latitude')
            .optional()
            .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
        body('longitude')
            .optional()
            .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
        validate
    ],
    cancel: [
        body('reason')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('Reason must be under 500 characters'),
        validate
    ]
};

/**
 * Job validation rules
 */
const jobValidation = {
    unclaim: [
        body('reason')
            .trim()
            .notEmpty().withMessage('Reason is required')
            .isLength({ min: 10, max: 500 }).withMessage('Reason must be 10-500 characters'),
        validate
    ]
};

/**
 * Admin validation rules
 */
const adminValidation = {
    rejectJob: [
        body('reason')
            .notEmpty().withMessage('Rejection reason is required')
            .isIn(['POOR_QUALITY', 'WRONG_LOCATION', 'FAKE_COMPLETION', 'PHOTO_ISSUES', 'OTHER'])
            .withMessage('Invalid rejection reason'),
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 1000 }).withMessage('Notes must be under 1000 characters'),
        body('allowRetry')
            .optional()
            .isBoolean().withMessage('allowRetry must be a boolean'),
        validate
    ],
    suspendUser: [
        body('reason')
            .trim()
            .notEmpty().withMessage('Suspension reason is required')
            .isLength({ min: 10, max: 500 }).withMessage('Reason must be 10-500 characters'),
        validate
    ],
    updateRole: [
        body('role')
            .notEmpty().withMessage('Role is required')
            .isIn(['CITIZEN', 'CLEANER', 'ADMIN']).withMessage('Invalid role'),
        validate
    ]
};

/**
 * Contribution validation rules
 */
const contributionValidation = {
    create: [
        body('amount')
            .isFloat({ min: 10 }).withMessage('Minimum contribution is ₹10'),
        body('campaignId')
            .notEmpty().withMessage('Campaign ID is required'),
        validate
    ]
};

/**
 * Auth validation rules
 */
const authValidation = {
    register: [
        body('email')
            .trim()
            .isEmail().withMessage('Valid email is required')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/[0-9]/).withMessage('Password must contain a number'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
        body('phone')
            .optional()
            .matches(/^[6-9]\d{9}$/).withMessage('Invalid Indian phone number'),
        validate
    ],
    login: [
        body('email')
            .trim()
            .isEmail().withMessage('Valid email is required')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required'),
        validate
    ]
};

/**
 * Sanitize input to prevent XSS
 */
const sanitizeInput = (req, res, next) => {
    // Recursively sanitize object
    const sanitize = (obj) => {
        if (typeof obj === 'string') {
            // Remove HTML tags and trim
            return obj.replace(/<[^>]*>/g, '').trim();
        }
        if (Array.isArray(obj)) {
            return obj.map(sanitize);
        }
        if (obj && typeof obj === 'object') {
            const sanitized = {};
            for (const key in obj) {
                sanitized[key] = sanitize(obj[key]);
            }
            return sanitized;
        }
        return obj;
    };

    if (req.body) {
        req.body = sanitize(req.body);
    }
    if (req.query) {
        req.query = sanitize(req.query);
    }

    next();
};

module.exports = {
    validate,
    campaignValidation,
    jobValidation,
    adminValidation,
    contributionValidation,
    authValidation,
    sanitizeInput
};
