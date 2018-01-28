/* global jest expect */
import React from 'react';
import { mount } from 'enzyme';
import { withTracking, Tracker, TrackerProvider } from '../../src';

describe('HOCs/withTracking', () => {
    const ComponentMock = () => (<div>Happy mock</div>);
    const wrapWithTracker = mapTrackingToProps => Component => {
        const ComponentWithTracking = withTracking(mapTrackingToProps)(Component);
        return () => (
            <TrackerProvider tracker={new Tracker()}>
                <ComponentWithTracking />
            </TrackerProvider>
        );
    };

    it('should throw if no Tracker is provided by the context', () => {
        const EnhancedComponent = withTracking()(ComponentMock);
        expect(() => {mount(<EnhancedComponent />)}).toThrow();
    });

    it('should pass trackEvent function explicitly to props if no mapTrackingToProps was given', () => {
        const mapTrackingToProps = null;
        const EnhancedComponent = wrapWithTracker(mapTrackingToProps)(ComponentMock);
        const wrapper = mount(<EnhancedComponent />);

        expect(typeof wrapper.find(ComponentMock).prop('trackEvent')).toEqual('function');
    });

    it('should pass merge the object returns from mapTrackingToProps to props', () => {
        const mapTrackingToProps = () => ({
            trackSomeEvent: () => {},
            trackAnOtherEvent: () => {}
        });

        const EnhancedComponent = wrapWithTracker(mapTrackingToProps)(ComponentMock);
        const wrapper = mount(<EnhancedComponent />);

        expect(wrapper.find(ComponentMock).prop('trackEvent')).not.toBeDefined();
        expect(typeof wrapper.find(ComponentMock).prop('trackSomeEvent')).toEqual('function');
        expect(typeof wrapper.find(ComponentMock).prop('trackAnOtherEvent')).toEqual('function');
    });

    it('should throw if the given mapTrackingToProps does not return an object', () => {
        const mapTrackingToProps = () => 'something elese';

        const EnhancedComponent = wrapWithTracker(mapTrackingToProps)(ComponentMock);
        expect(() => {mount(<EnhancedComponent />)}).toThrow();        
    });
});