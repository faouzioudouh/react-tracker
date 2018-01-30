import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { TrackerProvider, trackingMiddleware } from 'react-tracker'
import { ToastContainer, toast } from 'react-toastify';

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
const DisplayJson = dataLayer => (
  <Highlight className="json">
    {JSON.stringify(dataLayer, null, 2)}
  </Highlight>
)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLayer: {}
    }
  }

  componentWillMount() {
    configuredTracker.on('*', event => {
      toast(`Event Tracked: ${event.type}`);
      this.setState({
        dataLayer: window.dataLayer,
      });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <ToastContainer />
        <section>
          <TrackerProvider tracker={configuredTracker}>
            <FriendListAppWithStore />
          </TrackerProvider>
        </section>
        <section>
          <h3>DataLayer :</h3>
          <DisplayJson data={this.state.dataLayer} />
        </section>
      </div>
    );
  }
}
