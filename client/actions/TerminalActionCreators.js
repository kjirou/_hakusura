import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import AppModel from 'containers/AppModel';
import { parse } from 'lib/command-parser';


const COMMANDS = {

  'help-welcome': function helpIndex() {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      output: [
        '{magenta-fg}HAKUSURA{/} - A text-based hack & slash RPG',
        '',
        'If you are a beginner, please execute the `{green-fg}tutorial{/}` command.',
      ].join('\n')
    };
  },
};


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

  executeCommand(input) {

    if (_s.trim(input) === '') {
      return {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input: '',
      };
    }

    const { commandId, commandOptions } = parse(input);

    const command = COMMANDS[commandId] || null;
    if (command) {
      return Object.assign({
        input,
      }, command(commandOptions));
    }

    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input,
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

export default TerminalActionCreators;
