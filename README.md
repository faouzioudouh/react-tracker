# react-tracker [![npm version](https://badge.fury.io/js/react-tracker.svg)](https://badge.fury.io/js/react-tracker)

- React specific tracking library, usable as a higher-order component
- Flexible-scalable solution for tracking in React Apps
- Easy to use (Redux-like)
- Can be pluged with any Analytics platform agnostic lib (You can mainly do anything in the subscribers)

## Installation

```
npm install --save react-tracker
```

## Usage
`provideTracking()` expects one arguments, function `mapTrackingToProps`.
- `mapTrackingToProps` should return object to be merged with Component props.

### Provide tracking function to your component

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TrackerProvider, withTracking, Tracker } from 'react-tracker';

class HomePage extends React.Component {

  handleClick = () => {
    // ... you click logic

    this.props.TrackThisAction({
        type: 'CLICK_EVENT', // required
        data: // optional
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click Me!
      </button>
    );
  }
}

const mapTrackingToProps = trackEvent => ({
    TrackThisAction = trackEvent
});

const HomePageWithTracking = withTracking(mapTrackingToProps)(HomePage);

const tracker = new Tracker([
    {
        clickEvent: (event, eventsHistory) => {
            // Do whatevenr you want to do
        }
    }
]);

const HomePageWithTracker = () => (
    <TrackerProvider tracker={tracker}>
        <HomePageWithTracking />
    <TrackerProvider />    
);

ReactDOM.render(<HomePageWithTracker />, document.getElementById('root'));

```

### Usage on Stateless Functional Components

You can also track events by importing `withTracking()` and wrapping your stateless functional component, which will provide the object returned from `mapTrackingToProps` as props:

```js
import { withTracking } from 'react-tracking';

const FooPage = (props) => {
  return (
    <div onClick={() => {
        props.trackClickEvent({
            type: 'clickEvent',
            data: // Optional
        });

        // ... the rest of your component
      }}
    />
  )
}

const mapTrackingToProps = trackEvent => ({
    trackClickEvent: trackEvent
});

export default withTracking(mapTrackingToProps)(FooComponent);
```

### Advanced Usage
 // TODO

