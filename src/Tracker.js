import { assertSubscribers } from './utils';

export default class Tracker {
    constructor(subscribers) {
        this.trackingHistory = [];
        this.subscribers = assertSubscribers(subscribers);

        this.dispatch = this.dispatch.bind(this);
    }

    on(eventType, callback) {
        if (typeof callback === 'function' && eventType && typeof eventType === 'string') {
            callback.eventType = eventType;

            this.subscribers = [...this.subscribers, callback];
        }
    }

    dispatch(event) {
        const { type, data } = event || {};

        if (!type) {
            return null;
        }

        for (let i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function' && this.subscribers[i].eventType === type) {
                const save = this.subscribers[i].call(null, event, this.trackingHistory);

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