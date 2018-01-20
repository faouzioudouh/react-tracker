import { Component, Children } from 'react';
import propTypes from 'prop-types';

export default class TrackerProvider extends Component {
    getChildContext() {
        return {
            trackEvent: this.tracker.dispatch
            // We might need to extract other properties later.
        };
    }

    constructor(props, context) {
        super(props, context);
        this.tracker = props.tracker;
    }

    render() {
        return Children.only(this.props.children);
    }
}

TrackerProvider.propTypes = {
    children: propTypes.element.isRequired,
};

TrackerProvider.childContextTypes = {
    trackEvent: propTypes.func.isRequired,
};
