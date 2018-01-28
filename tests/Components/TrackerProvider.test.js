/* global jest expect */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types'
import { withTracking, Tracker, TrackerProvider } from '../../src';
import TestUtils from 'react-dom/test-utils'

describe('component/TrackerProvider', () => {
    const Child = class Child extends React.Component {
        render() {
            return <div />
        }
    }

    Child.contextTypes = {
        trackEvent: PropTypes.func
    }

    const tracker = new Tracker();

    const wrapWithTracker = ttracker => Component => {
        return (
            <TrackerProvider tracker={ttracker}>
                <Component />
            </TrackerProvider>
        );
    };

    it('should add trackeEvent to the child context', () => {
        const enhancedComponent = wrapWithTracker(tracker)(Child);
        const renderedComponent = mount(enhancedComponent);

        const tree = TestUtils.renderIntoDocument(enhancedComponent);
        const child = TestUtils.findRenderedComponentWithType(tree, Child)
        expect(child.context.trackEvent).toBe(tracker.trackEvent)
    });
});