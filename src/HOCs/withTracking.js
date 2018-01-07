import React from 'react'
import { getDisplayName } from '../utils';
import Types from '../types';

const withTracking = mapTrackingToProps => Component => {
    const displayName = getDisplayName(Component);

    const trackEventProvider = (props, context) => {
        const trackEvent = context.trackEvent;
        let propsWithTracking = {};

        if (!trackEvent) {
            throw Error(`Could not find tracker in the context of ` + `"${ displayName }"`);
        }

        // Get the object to merge with props
        if (typeof mapTrackingToProps === 'function') {
            propsWithTracking = mapTrackingToProps(trackEvent);

            if (!propsWithTracking || typeof propsWithTracking !== 'object') {
                throw Error(`mapTrackingToProps should return an object, instead it returns ` + `"${typeof propsWithTracking}"`);
            }
        } else {
            // if no `mapTrackingToProps` provided let's just pass trackEvent function to the props
            propsWithTracking = { trackEvent };
        }

        propsWithTracking = Object.assign({}, props, { trackEvent });        
        return React.createElement(Component, propsWithTracking);
    }

    trackEventProvider.displayName = displayName;
    trackEventProvider.contextTypes = {
        trackEvent: Types.func.isRequired
    };

    return trackEventProvider;
}

export default withTracking;