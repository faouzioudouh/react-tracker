import { assertlisteners } from './utils';

export default class Tracker {
    constructor(listeners) {
        this.trackingHistory = [];
        this.listeners = assertlisteners(listeners);

        this.trackEvent = this.trackEvent.bind(this);
    }

    on(eventType, callback) {
        if (typeof callback === 'function' && eventType && typeof eventType === 'string') {
            callback.eventType = eventType;

            this.listeners = [...this.listeners, callback];
        }
    }

    trackEvent(event) {
        const { type, data } = event || {};

        if (!type) {
            return null;
        }

        for (let i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];

            if (
                typeof listener === 'function' &&
                (
                    listener.eventType === type
                    || listener.eventType === '*'
                    || typeof listener.eventType === 'undefined'
                )
            ) {
                const save = listener.call(null, event, this.trackingHistory);

                if (save) {
                    this.trackingHistory = [...this.trackingHistory, save];
                }
            }
        }
    }

    getHistory() {
        return this.trackingHistory;
    }
}