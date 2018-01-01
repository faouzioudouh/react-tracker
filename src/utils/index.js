export const getDisplayName = WrappedComponent => {
    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';
    
    
    return `TrackEventProvider(${wrappedComponentName})`;
}