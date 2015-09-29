import _ from 'lodash';
import _s from 'underscore.string';

import {
  COMMAND_DEFINITION,
  COMMANDS,
  MINIMIST_OPTIONS_FOR_COMMAND,
  SHELL_INPUT_MODE_ALIASES,
} from './commands';
import ActionTypes from 'consts/ActionTypes';
import { parse } from 'lib/command-parser';


export function _applyShellInputModeAliasesToInput(aliases, input) {
  aliases.some(([matcher, replacement]) => {
    const replaced = input.replace(matcher, replacement);
    if (replaced !== input) {
      input = replaced;
      return true;
    }
    return false;
  });
  return input;
}


const TerminalActionCreators = {

  deleteCharacterFromShell(options = {}) {
    options = Object.assign({
      position: null,
    }, options);
    return {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
      position: options.position,
    };
  },

  executeCommand(shellInputMode, input, { silent = false } = {}) {

    let expandedInput = input;
    if (SHELL_INPUT_MODE_ALIASES[shellInputMode]) {
      expandedInput = _applyShellInputModeAliasesToInput(SHELL_INPUT_MODE_ALIASES[shellInputMode], input);
    }

    if (_s.trim(expandedInput) === '') {
      return {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input: '',
      };
    }

    const { commandId, commandOptions } = parse(COMMAND_DEFINITION, MINIMIST_OPTIONS_FOR_COMMAND, expandedInput);

    const command = COMMANDS[commandId] || null;
    if (command) {
      const actionOrActions = command({
        input,
        args: commandOptions._,
        options: _.omit(commandOptions, '_'),
      });
      // Apply silent execution
      (Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions]).forEach((action) => {
        if (action.type === ActionTypes.APPLY_COMMAND_EXECUTION && silent) {
          Object.assign(action, {
            input: null,
            output: null,
          });
        }
      });
      return actionOrActions;
    }

    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input,
      output: '{red-fg}Invalid command{/}',
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

  moveCursor(position) {
    return {
      type: ActionTypes.MOVE_CURSOR,
      position,
    };
  },

  moveCursorByRelative(relativePosition) {
    return {
      type: ActionTypes.MOVE_CURSOR,
      relativePosition,
    };
  },

  moveIndexWindowCursor(relativeIndex) {
    return {
      type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
      relativeIndex,
    };
  },
};

export default TerminalActionCreators;
