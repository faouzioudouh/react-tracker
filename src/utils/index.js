export const getDisplayName = WrappedComponent => {
    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    return `TrackEventProvider(${wrappedComponentName})`;
}

export const assertlisteners = (listeners = []) => {
    return listeners.filter(listener => typeof listener === 'function');
}
