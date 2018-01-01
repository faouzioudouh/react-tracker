import React from 'react'
import { getDisplayName } from '../utils';
import Types from '../types';

const provideTrackEvent = (Component, mapTrackerEventToProps) => {
    const displayName = getDisplayName(Component);

    const trackEventProvider = (props, context) => {
        const trackEvent = context.tracker.dispatch;

        if (!trackEvent) {
            throw Error(`Could not find tracker in the context of ` + `"${displayName}"`);
        }

        const propsWithTrackEvent = Object.assign({}, props, { trackEvent });

        return React.createElement(Component, propsWithTrackEvent)
    }

    trackEventProvider.displayName = displayName;
    trackEventProvider.contextTypes = {
        tracker: Types.tracker.isRequired
    };

    return trackEventProvider;
}

export default provideTrackEvent;