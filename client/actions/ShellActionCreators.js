import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import AppModel from 'containers/AppModel';
import { parse } from 'lib/command-parser';


const ShellActionCreators = {

  deleteCharacterFromShell(options = {}) {
    options = Object.assign({
      position: null,
    }, options);
    return {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
      position: options.position,
    };
  },

  executeCommand(inputBuffer) {

    if (_s.trim(inputBuffer) === '') {
      return {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
      };
    }

    const { commandId, commandOptions } = parse(inputBuffer);

    switch (commandId) {
      case 'help-index':
        return (() => {
          return {
            type: ActionTypes.APPLY_COMMAND_EXECUTION,
            output: 'help',
          };
        })();
    }

    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      output: '{red-fg}Invalid shell input{/}',
    };
  },

  inputToShell(input, options = {}) {
    options = Object.assign({
      position: null,
    }, options);
    return {
      type: ActionTypes.INPUT_TO_SHELL,
      input,
      position: options.position,
    };
  },
};

export default ShellActionCreators;
