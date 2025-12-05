const cron = require('node-cron');
const { processCampaignExpiration } = require('./campaignExpiration');
const { processJobAutoRelease, sendDeadlineReminders } = require('./jobAutoRelease');
const { processPayouts } = require('./payoutProcessor');
const { processRefunds } = require('./refundProcessor');

/**
 * Initialize all cron jobs
 */
function initializeCronJobs() {
    console.log('[Cron] Initializing scheduled jobs...');

    // Campaign Expiration - Daily at midnight
    cron.schedule('0 0 * * *', async () => {
        console.log('[Cron] Running campaign expiration check...');
        try {
            await processCampaignExpiration();
        } catch (error) {
            console.error('[Cron] Campaign expiration error:', error);
        }
    }, {
        timezone: 'Asia/Kolkata'
    });

    // Job Auto-Release - Hourly
    cron.schedule('0 * * * *', async () => {
        console.log('[Cron] Running job auto-release check...');
        try {
            await processJobAutoRelease();
        } catch (error) {
            console.error('[Cron] Job auto-release error:', error);
        }
    });

    // Deadline Reminders - Every 30 minutes
    cron.schedule('*/30 * * * *', async () => {
        console.log('[Cron] Running deadline reminder check...');
        try {
            await sendDeadlineReminders();
        } catch (error) {
            console.error('[Cron] Deadline reminder error:', error);
        }
    });

    // Payout Processing - Daily at 10 AM IST
    cron.schedule('0 10 * * *', async () => {
        console.log('[Cron] Running payout processing...');
        try {
            await processPayouts();
        } catch (error) {
            console.error('[Cron] Payout processing error:', error);
        }
    }, {
        timezone: 'Asia/Kolkata'
    });

    // Refund Processing - Every 4 hours
    cron.schedule('0 */4 * * *', async () => {
        console.log('[Cron] Running refund processing...');
        try {
            await processRefunds();
        } catch (error) {
            console.error('[Cron] Refund processing error:', error);
        }
    });

    console.log('[Cron] All scheduled jobs initialized');
}

module.exports = { initializeCronJobs };
