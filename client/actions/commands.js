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

  [ShellInputModes.DEFAULT]: [
    [/^on/, 'wizard on'],
    [/^sb/, 'wizard sandbox'],
  ],

  [ShellInputModes.WIZARD]: [
    [/^off/, 'wizard off'],
    [/^(getstate|get)/, 'wizard getstate'],
    [/^(setstate|set)/, 'wizard setstate'],
  ],
};

export var COMMAND_DEFINITION = {
  commands: {
    wizard: {
      default: 'on',
      commands: {
        getstate: null,
        off: null,
        on: null,
        sandbox: null,
        setstate: null,
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
  'character-list': {
    default: {
      from: 1,
      to: 9999,
    },
    alias: {
      from: ['f'],
      to: ['t'],
    },
  },
};

export var COMMANDS = {

  'character-list': ({ input, options }) => {
    const { characterList } = AppModel.getInstance();
    const objects = characterList.getListObjects().slice(options.from - 1, options.to);
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input,
      output: objects.map((character) => {
        return character.toBlessedContentLine();
      }).join('\n'),
    };
  },

  'help-welcome': ({ input }) => {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input,
      output: [
        '{magenta-fg}HAKUSURA{/} - A text-based hack & slash RPG',
        '',
        'If you are a beginner, please execute the `{green-fg}tutorial{/}` command.',
      ].join('\n'),
    };
  },

  'wizard-getstate': ({ input, args }) => {
    const [ dataPath ] = args;
    return {
      type: ActionTypes.GET_STATE,
      dataPath,
      input,
    };
  },

  'wizard-off': ({ input }) => {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: ShellInputModes.DEFAULT,
      input,
    };
  },

  'wizard-on': ({ input }) => {
    return {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      newShellInputMode: ShellInputModes.WIZARD,
      input,
    };
  },

  'wizard-sandbox': ({ input, args, options }) => {
    return [
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input,
      },
    ];
  },

  'wizard-setstate': ({ input, args }) => {
    const [ dataPath, json ] = args;
    return {
      type: ActionTypes.SET_STATE,
      dataPath,
      json,
      input,
    };
  },
};
