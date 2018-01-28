import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { TrackerProvider, trackingMiddleware } from 'react-tracker'

import FriendListApp from './FriendListApp';
import storeProvider from '../hoc/storeProvider';
import configureStore from '../store/configureStore';

// get the tracker
import configuredTracker from '../tracking/configureTracker';

// Configure the store, with tracking middleware.
const store = configureStore({}, trackingMiddleware(configuredTracker));

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
    configuredTracker.on('*', (event, eventsHistory) => {
      this.setState({ eventsHistory });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <section>
          <TrackerProvider tracker={configuredTracker}>
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
