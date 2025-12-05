const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        error: 'Too many requests, please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Authentication rate limiter
 * 5 requests per 15 minutes per IP (for login/register)
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        error: 'Too many authentication attempts, please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Only count failed attempts
});

/**
 * Strict rate limiter for sensitive operations
 * 10 requests per hour per IP
 */
const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        error: 'Rate limit exceeded for this operation.',
        retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Payment webhook rate limiter
 * Higher limit for webhooks from payment providers
 */
const webhookLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: {
        error: 'Webhook rate limit exceeded.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Admin API rate limiter
 * 200 requests per minute
 */
const adminLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 200,
    message: {
        error: 'Admin API rate limit exceeded.',
        retryAfter: '1 minute'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Create user-based rate limiter
 * Limits based on user ID instead of IP
 */
const createUserLimiter = (options) => {
    return rateLimit({
        ...options,
        keyGenerator: (req) => {
            return req.user?.userId || req.ip;
        }
    });
};

/**
 * Job claiming rate limiter
 * 10 claims per hour per user
 */
const jobClaimLimiter = createUserLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        error: 'You have reached the maximum number of job claims for this hour.',
        retryAfter: '1 hour'
    }
});

/**
 * Campaign creation rate limiter
 * 5 campaigns per day per user
 */
const campaignCreateLimiter = createUserLimiter({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 5,
    message: {
        error: 'You have reached the maximum number of campaigns for today.',
        retryAfter: '24 hours'
    }
});

module.exports = {
    generalLimiter,
    authLimiter,
    strictLimiter,
    webhookLimiter,
    adminLimiter,
    jobClaimLimiter,
    campaignCreateLimiter,
    createUserLimiter
};
