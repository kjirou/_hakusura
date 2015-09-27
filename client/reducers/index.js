import _ from 'lodash';
import objectPath from 'object-path';
import { combineReducers } from 'redux';

import screenReducer from './screen';
import { syncTerminalStateByCommandExecution } from './shared';
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

const wizardReducer = (state, action = {}) => {

  switch (action.type) {

    case ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD:
      return ((action) => {
        const {
          mode,
          dataPath = null,
          json = null,
          input = null,
        } = action;

        let output = null;
        // get state
        if (mode === 'getstate') {
          if (objectPath.has(state, dataPath)) {
            output = objectPath.get(state, dataPath).toString();
          } else {
            output = `Could not find the state by "${dataPath}"`;
          }
        // set state
        } else if (
          mode === 'setstate' &&
          typeof json === 'string' &&
          objectPath.has(state, dataPath)
        ) {
          try {
            const newValue = JSON.parse(json);
            state = _.cloneDeep(state);
            objectPath.set(state, dataPath, newValue)
          } catch (err) {
            output = '{red-fg}' + err.message + '{/}';
          }
        }

        const terminalState = syncTerminalStateByCommandExecution(state.terminal, { input, output });

        return Object.assign({}, state, {
          terminal: terminalState,
        });
      })(action);
  }

  return state;
};

const rootReducer = (state, action = {}) => {

  state = statusReducer(state, action);
  state = wizardReducer(state, action);

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
  }

  return state;
};

export default rootReducer;
