import _ from 'lodash';
import objectPath from 'object-path';
import { combineReducers } from 'redux';

import screenReducer from './screen';
import terminalReducer from './terminal';
import timeReducer from './time';
import windowReducer from './window';
import ActionTypes from 'consts/ActionTypes';


const statusReducer = combineReducers({
  screen: screenReducer,
  terminal: terminalReducer,
  time: timeReducer,
  window: windowReducer,
});

const rootReducer = (state, action) => {

  //switch (action.type) {

  //  case ActionTypes.WIZARD_GET_STATE:
  //    return (({ dataPath }) => {
  //      if (!objectPath.has(state, dataPath)) {
  //      }
  //    })(action);

  //  case ActionTypes.WIZARD_SET_STATE:
  //    return (({ dataPath, json }) => {
  //      if (
  //        typeof json !== 'string' ||
  //        !objectPath.has(state, dataPath)
  //      ) {
  //        return state;
  //      }
  //      try {
  //        const value = JSON.parse(json);
  //      } catch (err) {
  //        return state;
  //      }
  //      state = _.cloneDeep(state);
  //      objectPath.set(state, dataPath, value)
  //      return state;
  //    })(action);
  //}

  return statusReducer(state, action);
};

export default rootReducer;
