import ActionTypes from 'consts/ActionTypes';
import ShellInputModes from 'consts/ShellInputModes';
import AppModel from 'containers/AppModel';
import { PLAYER_STATE_CODES } from 'models/GameModel';


export function _selectShellInputMode(playerStateCode) {
  return ShellInputModes[({
    [PLAYER_STATE_CODES.ADVENTURING]: ShellInputModes.ADVENTURE,
    [PLAYER_STATE_CODES.BATTLING]: ShellInputModes.BATTLE,
  }[playerStateCode]) || ShellInputModes.DEFAULT];
}

export var SHELL_INPUT_MODE_ALIASES = {

  [ShellInputModes.WIZARD]: [
    [/^adv/, '_wizard adventuring'],
    [/^bat/, '_wizard battling'],
  ],
};

export var COMMAND_DEFINITION = {
  commands: {
    _wizard: {
      default: 'on',
      commands: {
        adventuring: null,
        battling: null,
        off: null,
        on: null,
      },
    },
    alias: null,
    character: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        select: null,
        show: null,
      }
    },
    config: null,
    dictionary: null,
    guild: null,
    help: {
      default: 'welcome',
      commands: {
        welcome: null,
      }
    },
    item: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        show: null,
      }
    },
    recruit: null,
  },
};

export var MINIMIST_OPTIONS_FOR_COMMAND = {
};

export var COMMANDS = {

  '_wizard-adventuring': function wizardAdventuring() {
    const { game } = AppModel.getInstance();
    game._isAdventuring = true;
    game._isBattling = false;
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: _selectShellInputMode(game.getPlayerStateCode()),
    };
  },

  '_wizard-battling': function wizardBattling() {
    const { game } = AppModel.getInstance();
    game._isAdventuring = true;
    game._isBattling = true;
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: _selectShellInputMode(game.getPlayerStateCode()),
    };
  },

  '_wizard-off': function wizardOn() {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: ShellInputModes.DEFAULT,
    };
  },

  '_wizard-on': function wizardOn() {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: ShellInputModes.WIZARD,
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
