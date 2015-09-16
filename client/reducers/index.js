import { combineReducers } from 'redux';

import screenReducer from './screen';
import timeReducer from './time';


const rootReducer = combineReducers({
  screen: screenReducer,
  time: timeReducer,
});

export default rootReducer;
