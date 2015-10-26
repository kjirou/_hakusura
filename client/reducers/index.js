import _ from 'lodash';
import objectPath from 'object-path';
import { combineReducers } from 'redux';

import adventureWindowReducer from './adventure-window';
import indexWindowReducer from './index-window';
import screenReducer from './screen';
import { syncTerminalStateByCommandExecution } from './shared';
import terminalReducer from './terminal';
import timeReducer from './time';
import windowReducer from './window';
import ActionTypes from 'consts/ActionTypes';


const statusReducer = combineReducers({
  adventureWindow: adventureWindowReducer,
  indexWindow: indexWindowReducer,
  screen: screenReducer,
  terminal: terminalReducer,
  time: timeReducer,
  window: windowReducer,
});

const rootReducer = (state, action = {}) => {

  state = statusReducer(state, action);

  // GET_STATE and SET_STATE are not good as redux-way
  // However, I dared to define for manual debugging
  switch (action.type) {

    case ActionTypes.APPLY_COMMAND_EXECUTION:
      return ((action) => {
        const {
          newShellInputMode = null,
          input = null,
          output = null,
        } = action;

        const newTerminalState = syncTerminalStateByCommandExecution(
          state.terminal,
          { newShellInputMode, input, output }
        );

        return Object.assign({}, state, {
          terminal: newTerminalState,
        });
      })(action);

    case ActionTypes.GET_STATE:
      return (({ dataPath, input }) => {
        let output = null;

        if (objectPath.has(state, dataPath)) {
          output = objectPath.get(state, dataPath).toString();
        } else {
          output = `Could not find the state by "${dataPath}"`;
        }

        const newTerminalState = syncTerminalStateByCommandExecution(
          state.terminal,
          { input, output }
        );

        return Object.assign({}, state, {
          terminal: newTerminalState,
        });

      })(action);

    case ActionTypes.SET_STATE:
      return (({ dataPath, json, input }) => {
        let output = null;

        if (typeof json === 'string' && objectPath.has(state, dataPath)) {
          try {
            const newValue = JSON.parse(json);
            state = _.cloneDeep(state);
            objectPath.set(state, dataPath, newValue)
          } catch (err) {
            output = '{red-fg}' + err.message + '{/}';
          }

        }

        const newTerminalState = syncTerminalStateByCommandExecution(
          state.terminal,
          { input, output }
        );

        return Object.assign({}, state, {
          terminal: newTerminalState,
        });
      })(action);
  }

  return state;
};

export default rootReducer;
