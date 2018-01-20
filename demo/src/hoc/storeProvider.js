import React from 'react';
import { Provider } from 'react-redux';

export default store => Component => props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);
