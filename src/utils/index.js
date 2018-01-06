export const getDisplayName = WrappedComponent => {
    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    return `TrackEventProvider(${wrappedComponentName})`;
}

export const assertSubscribers = (subscribers = []) => {
    return subscribers.map(subscriber => {
        const eventType = Object.keys(subscriber)[0];

        if ( eventType && typeof subscriber[eventType] === 'function') {
            subscriber[eventType].eventType = eventType;
            return subscriber[eventType];
        }
    })
    .filter(subscriber => Boolean(subscriber));
}
