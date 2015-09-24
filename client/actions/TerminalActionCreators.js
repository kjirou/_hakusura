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

  executeCommand(shellInputMode, rawInput) {

    let input = rawInput;
    if (SHELL_INPUT_MODE_ALIASES[shellInputMode]) {
      input = _applyShellInputModeAliasesToInput(SHELL_INPUT_MODE_ALIASES[shellInputMode], rawInput);
    }

    if (_s.trim(input) === '') {
      return {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input: '',
      };
    }

    const { commandId, commandOptions } = parse(COMMAND_DEFINITION, MINIMIST_OPTIONS_FOR_COMMAND, input);

    const command = COMMANDS[commandId] || null;
    if (command) {
      let action = command(commandOptions);
      if (action.type === ActionTypes.APPLY_COMMAND_EXECUTION && action.input === undefined) {
        Object.assign(action, {
          input: rawInput,
        });
      }
      return action;
    }

    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input: rawInput,
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
};

export default TerminalActionCreators;
