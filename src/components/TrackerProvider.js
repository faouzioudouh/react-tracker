import { Component, Children } from 'react';
import Types from '../types';

export default class TrackerProvider extends Component {
    getChildContext() {
        console.log('from here: ', this.tracker);
        return {
            tracker: this.tracker
        }
    }

    constructor(props, context) {
        super(props, context)
        this.tracker = props.tracker;

        console.log('from here constrc: ', this.tracker);
    }

    render() {
        console.log('from here render: ', this.tracker);

        return Children.only(this.props.children)
    }
}

TrackerProvider.propTypes = {
    tracker: Types.tracker.isRequired,
    children: Types.element.isRequired,
};

TrackerProvider.childContextTypes = {
    tracker: Types.tracker.isRequired,
};
