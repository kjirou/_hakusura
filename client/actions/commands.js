import ActionTypes from 'consts/ActionTypes';
import ShellInputModes from 'consts/ShellInputModes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';
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

export var COMMANDS = {

  'adventure-start': ({ input, args, options }) => {
    const { game } = AppModel.getInstance();
    game.prepareAdventurer();
    game.prepareAdventure();
    return [
      {
        type: ActionTypes.ACTIVATE_ADVENTURE_WINDOW,
        dungeonCards: game.adventure.dungeonCardList,
      },
      {
        type: ActionTypes.UNMINIMIZE_WINDOW,
      },
      {
        type: ActionTypes.OPEN_WINDOW,
        windowContentType: WINDOW_CONTENT_TYPES.ADVENTURE,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        //newShellInputMode: ShellInputModes.INDEX,
        input,
      },
    ];
  },

  'adventure-proceed': ({ input, args, options }) => {
    const { game } = AppModel.getInstance();

    // TODO:
    if (game.getPlayerStateCode() !== PLAYER_STATE_CODES.ADVENTURING) {
      return {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input,
        output: '{red-fg}Not in adventure{/}',
      };
    }

    game.adventure.proceed();

    return [
      {
        type: ActionTypes.ACTIVATE_ADVENTURE_WINDOW,
        dungeonCards: game.adventure.dungeonCardList,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input,
      },
    ];
  },

  'character-index': ({ input, args, options }) => {
    const { characterList, windowHistoryList } = AppModel.getInstance();
    windowHistoryList.stack(input);

    return [
      {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: characterList.getListPagination(10, options.page),
        rightAndLeftCommandTemplate: 'character index --page <%= page %>',
        actionCommandTemplate: 'character show',
      },
      {
        type: ActionTypes.UNMINIMIZE_WINDOW,
      },
      {
        type: ActionTypes.OPEN_WINDOW,
        windowContentType: WINDOW_CONTENT_TYPES.INDEX,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        newShellInputMode: ShellInputModes.INDEX,
        input,
      },
    ];
  },

  'character-list': ({ input, args, options }) => {
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

  'character-show': ({ input, args, options }) => {
    const { characterList, windowHistoryList } = AppModel.getInstance();
    windowHistoryList.stack(input);

    return [
      //{
      //  type: ActionTypes.ACTIVATE_INDEX_WINDOW,
      //  listPagination: characterList.getListPagination(10, options.page),
      //  rightAndLeftCommandTemplate: 'character index --page <%= page %>',
      //  actionCommandTemplate: '',
      //},
      {
        type: ActionTypes.UNMINIMIZE_WINDOW,
      },
      {
        type: ActionTypes.OPEN_WINDOW,
        windowContentType: WINDOW_CONTENT_TYPES.CHARACTER,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        //newShellInputMode: ShellInputModes.INDEX,
        input,
      },
    ];
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

  'window-close': ({ input }) => {
    const { windowHistoryList } = AppModel.getInstance();
    windowHistoryList.pop();
    const command = windowHistoryList.getListObjects()[0] || null;

    if (!command) {
      return [
        {
          type: ActionTypes.CLOSE_WINDOW,
        },
        {
          type: ActionTypes.APPLY_COMMAND_EXECUTION,
          newShellInputMode: ShellInputModes.DEFAULT,
          input,
        },
      ];
    } else {
      return command;
    };
  },

  'window-purge': ({ input }) => {
    return [
      {
        type: ActionTypes.CLOSE_WINDOW,
      },
      {
        type: ActionTypes.INACTIVATE_INDEX_WINDOW,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        newShellInputMode: ShellInputModes.DEFAULT,
        input,
      },
    ];
  },

  'window-toggle': ({ input }) => {
    return [
      {
        type: ActionTypes.TOGGLE_WINDOW,
      },
      {
        type: ActionTypes.APPLY_COMMAND_EXECUTION,
        input,
      },
    ];
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
