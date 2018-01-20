import React from 'react'
import propTypes from 'prop-types';

import { getDisplayName } from '../utils';

const withTracking = mapTrackingToProps => Component => {
    const displayName = getDisplayName(Component);

    const trackEventProvider = (props, context) => {
        const trackEvent = context.trackEvent;
        let trackingProps = {};

        if (!trackEvent) {
            throw Error(`Could not find tracker in the context of ` + `"${ displayName }"`);
        }

        // Get the object to merge with props
        if (typeof mapTrackingToProps === 'function') {
            trackingProps = mapTrackingToProps(trackEvent);

            if (!trackingProps || typeof trackingProps !== 'object') {
                throw Error(`mapTrackingToProps should return an object, instead it returns ` + `"${typeof trackingProps}"`);
            }
        } else {
            // if no `mapTrackingToProps` provided let's just pass trackEvent function to the props
            trackingProps = { trackEvent };
        }

        const propsWithTracking = Object.assign({}, props, trackingProps);        
        return React.createElement(Component, propsWithTracking);
    }

    trackEventProvider.displayName = displayName;
    trackEventProvider.contextTypes = {
        trackEvent: propTypes.func.isRequired
    };

    return trackEventProvider;
}

export default withTracking;