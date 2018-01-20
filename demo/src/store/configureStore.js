import { createStore, combineReducers } from 'redux';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);

const configureStore = (initialState = {}) => createStore(
  reducer,
  initialState,
);

export default configureStore;
