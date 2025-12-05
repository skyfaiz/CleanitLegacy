const EventEmitter = require('events');

/**
 * Application-wide event bus for decoupled communication
 * Used primarily for triggering notifications and side effects
 */
class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(20); // Increase limit for multiple listeners
    }

    /**
     * Emit an event with logging
     * @param {string} eventName - Name of the event
     * @param {object} payload - Event data
     */
    emitEvent(eventName, payload) {
        console.log(`[EventBus] Emitting: ${eventName}`, { 
            timestamp: new Date().toISOString(),
            payload: { ...payload, sensitiveData: undefined } // Don't log sensitive data
        });
        this.emit(eventName, payload);
    }
}

// Event type constants
const EventTypes = {
    // Campaign events
    CAMPAIGN_CREATED: 'CAMPAIGN_CREATED',
    CAMPAIGN_APPROVED: 'CAMPAIGN_APPROVED',
    CAMPAIGN_FUNDED: 'CAMPAIGN_FUNDED',
    CAMPAIGN_CONTRIBUTION: 'CAMPAIGN_CONTRIBUTION',
    CAMPAIGN_EXPIRED: 'CAMPAIGN_EXPIRED',
    CAMPAIGN_CANCELLED: 'CAMPAIGN_CANCELLED',

    // Job events
    JOB_AVAILABLE: 'JOB_AVAILABLE',
    JOB_CLAIMED: 'JOB_CLAIMED',
    JOB_COMPLETED: 'JOB_COMPLETED',
    JOB_VERIFIED: 'JOB_VERIFIED',
    JOB_REJECTED: 'JOB_REJECTED',
    JOB_AUTO_RELEASED: 'JOB_AUTO_RELEASED',
    JOB_UNCLAIMED: 'JOB_UNCLAIMED',

    // Payment events
    PAYOUT_CREATED: 'PAYOUT_CREATED',
    PAYOUT_SUCCESS: 'PAYOUT_SUCCESS',
    PAYOUT_FAILED: 'PAYOUT_FAILED',
    REFUND_INITIATED: 'REFUND_INITIATED',
    REFUND_PROCESSED: 'REFUND_PROCESSED',

    // Reminder events
    DEADLINE_REMINDER_24H: 'DEADLINE_REMINDER_24H',
    DEADLINE_REMINDER_1H: 'DEADLINE_REMINDER_1H',

    // Admin events
    VERIFICATION_NEEDED: 'VERIFICATION_NEEDED',
    ADMIN_ACTION_REQUIRED: 'ADMIN_ACTION_REQUIRED'
};

// Singleton instance
const eventBus = new EventBus();

module.exports = { eventBus, EventTypes };
