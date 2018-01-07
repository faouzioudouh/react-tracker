import { Component, Children } from 'react';
import Types from '../types';

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
    children: Types.element.isRequired,
};

TrackerProvider.childContextTypes = {
    trackEvent: Types.func.isRequired,
};
