import { combineReducers } from 'redux';

import screenReducer from './screen';
import shellReducer from './shell';
import timeReducer from './time';


const rootReducer = combineReducers({
  screen: screenReducer,
  shell: shellReducer,
  time: timeReducer,
});

export default rootReducer;
