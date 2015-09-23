import { combineReducers } from 'redux';

import screenReducer from './screen';
import terminalReducer from './terminal';
import timeReducer from './time';


const rootReducer = combineReducers({
  screen: screenReducer,
  terminal: terminalReducer,
  time: timeReducer,
});

export default rootReducer;
