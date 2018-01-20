import React, { Component } from 'react';
import { TrackerProvider, Tracker } from 'react-tracker'

import FriendListApp from './FriendListApp';
import storeProvider from '../hoc/storeProvider';
import configureStore from '../store/configureStore';


// tracking
import trackingListeners from '../tracking/listeners';
const tracker = new Tracker(trackingListeners);

// Configure the store.
const store = configureStore();
const provideStore = storeProvider(store);
const FriendListAppWithStore = provideStore(FriendListApp);



export default class App extends Component {
  render() {
    return (
      <div>
        <TrackerProvider tracker={tracker}>
          <FriendListAppWithStore />
        </TrackerProvider>
      </div>
    );
  }
}
