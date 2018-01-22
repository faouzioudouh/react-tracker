import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);

const configureStore = (initialState = {}, trackingMiddleware) => createStore(
  reducer,
  initialState,
  applyMiddleware(trackingMiddleware)
);

export default configureStore;
