export default class Tracker {
    constructor(subscribers) {
        this.trackingHistory = [];
        this.subscribers = subscribers || [];
    }

    subscribe(eventType, callback) {
        this.subscribers = [...this.subscribers, Object.assign({}, { [eventType]: callback })];
    }

    dispatch = (event) => {
        const { type, data } = event || {};

        if (!type) {
            return null;
        }
      
        for (let subscriber in this.subscribers) {

            if (Object.prototype.hasOwnProperty.call(this.subscribers, subscriber)) {
                if (typeof this.subscribers[subscriber] === 'function' && subscriber === type) {
                    const save = this.subscribers[subscriber](event, this.trackingHistory);

                    if (save) {
                        this.trackingHistory = [...this.trackingHistory, save];
                    }
                }
            }
        }
    }

    getHistory() {
        return this.trackingHistory;
    }
}