/**
 * Simple redux middleware to use redux axtions as input of tracking!
 * this will call the track function from the provided instance of tracker on every action
 * and use the action type as the event type and the action payload as the event data
 * @param {Object} tracker 
 */
const trackingMiddleware = tracker => () => next => action => {
    tracker.trackEvent(action);
    next(action);
};

export default trackingMiddleware;