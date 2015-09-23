import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import ShellInputModes from 'consts/ShellInputModes';
import AppModel from 'containers/AppModel';
import { parse } from 'lib/command-parser';
import { PLAYER_STATE_CODES } from 'models/GameModel';


export function _selectShellInputMode(playerStateCode) {
  return ShellInputModes[({
    [PLAYER_STATE_CODES.ADVENTURING]: ShellInputModes.ADVENTURE,
    [PLAYER_STATE_CODES.BATTLING]: ShellInputModes.BATTLE,
  }[playerStateCode]) || ShellInputModes.DEFAULT];
}

const COMMANDS = {

  '_wizard-adventuring': function wizardAdventuring() {
    const { game } = AppModel.getInstance();
    game._isAdventuring = true;
    game._isBattling = false;
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      shellInputMode: _selectShellInputMode(game.getPlayerStateCode()),
    };
  },

  '_wizard-battling': function wizardBattling() {
    const { game } = AppModel.getInstance();
    game._isAdventuring = true;
    game._isBattling = true;
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      shellInputMode: _selectShellInputMode(game.getPlayerStateCode()),
    };
  },

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
