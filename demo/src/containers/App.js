import React, { Component } from 'react';
import { TrackerProvider, Tracker, trackingMiddleware } from 'react-tracker'
import Highlight from 'react-highlight';

import FriendListApp from './FriendListApp';
import storeProvider from '../hoc/storeProvider';
import configureStore from '../store/configureStore';

// tracking
import trackingListeners from '../tracking/listeners';
const tracker = new Tracker(trackingListeners);

// Configure the store.
const store = configureStore({}, trackingMiddleware(tracker));

const provideStore = storeProvider(store);
const FriendListAppWithStore = provideStore(FriendListApp);

// Component to format JSON and display it!
const DisplayJson = eventsHistory => (
  <Highlight className="json">
    {JSON.stringify(eventsHistory, null, 2)}
  </Highlight>
)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsHistory: {}
    }
  }

  componentWillMount() {
    tracker.on('*', (event, eventsHistory) => {
      this.setState({ eventsHistory });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <section>
          <TrackerProvider tracker={tracker}>
            <FriendListAppWithStore />
          </TrackerProvider>
        </section>
        <section>
          <h3>History of tracking :</h3>
          <DisplayJson data={this.state.eventsHistory} />
        </section>
      </div>
    );
  }
}
