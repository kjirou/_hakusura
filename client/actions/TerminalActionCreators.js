import _ from 'lodash';
import _s from 'underscore.string';

import {
  COMMAND_COMPLEMENTIONS,
  COMMANDS,
  SHELL_INPUT_MODE_ALIASES,
} from './commands';
import ActionTypes from 'consts/ActionTypes';
import {
  COMMAND_TREE,
  MINIMIST_OPTIONS,
} from 'consts/CommandDefinition';
import ShellInputModes from 'consts/ShellInputModes';
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

const executeCommand = (shellInputMode, input, { silent = false } = {}) => {

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

  const { commandId, commandOptions } = parse(COMMAND_TREE, MINIMIST_OPTIONS, expandedInput);

  // TODO: Too complex
  const command = COMMANDS[commandId] || null;
  if (command) {
    const actionOrActionsOrCommand = command({
      input,
      args: commandOptions._,
      options: _.omit(commandOptions, '_'),
    });
    // Pass to another command recursively
    if (_.isString(actionOrActionsOrCommand)) {
      return executeCommand(ShellInputModes.DEFAULT, actionOrActionsOrCommand, { silent: true });
    }
    // To array
    const actions = (Array.isArray(actionOrActionsOrCommand))
      ? actionOrActionsOrCommand
      : [actionOrActionsOrCommand]
    ;
    // Apply silent execution
    actions.forEach((action) => {
      if (action.type === ActionTypes.APPLY_COMMAND_EXECUTION && silent) {
        Object.assign(action, {
          input: null,
          output: null,
        });
      }
    });
    return actions;
  }

  return {
    type: ActionTypes.APPLY_COMMAND_EXECUTION,
    input,
    output: '{red-fg}Invalid command{/}',
  };
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

  complementCommand() {
    return {
      type: ActionTypes.COMPLEMENT_COMMAND,
      complementationPatterns: COMMAND_COMPLEMENTIONS,
    };
  },

  executeCommand,

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
