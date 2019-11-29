import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

export function configureStore(preloadedState) {
  const reducer = combineReducers(reducers);
  return createStore(reducer, preloadedState, composeWithDevTools());
}

