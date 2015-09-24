import { combineReducers } from 'redux';

import screenReducer from './screen';
import terminalReducer from './terminal';
import timeReducer from './time';
import windowReducer from './window';


const rootReducer = combineReducers({
  screen: screenReducer,
  terminal: terminalReducer,
  time: timeReducer,
  window: windowReducer,
});

export default rootReducer;
