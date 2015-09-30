import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import { SCREEN_WIDTH } from 'consts/ViewProps';
import ShellInputModes from 'consts/ShellInputModes';
import { complementCommand, } from 'lib/command-parser';
import { generatePrompt } from 'lib/text-processor';


const createInitialState = () => {
  return {
    shellInputMode: ShellInputModes.DEFAULT,
    inputBuffer: '',
    commandSuggestion: null,
    cursorPosition: 0,
    outputLines: [],
  };
};

export default function terminalReducer(state = createInitialState(), action = { type: '_init' }) {

  switch (action.type) {

    case ActionTypes.COMPLEMENT_COMMAND:
      return (({ complementationPatterns }) => {
        let newCommandSuggestion = state.commandSuggestion;
        if (newCommandSuggestion === null) {
          newCommandSuggestion = state.inputBuffer;
        }
        const newInputBuffer = complementCommand(
          complementationPatterns,
          newCommandSuggestion,
          state.inputBuffer
        );
        return Object.assign({}, state, {
          inputBuffer: newInputBuffer,
          commandSuggestion: newCommandSuggestion,
          cursorPosition: newInputBuffer.length,
        });
      })(action);

    case ActionTypes.DELETE_CHARACTER_FROM_SHELL:
      return (({ position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length - 1;
        }
        if (position < 0) {
          return state;
        }
        return Object.assign({}, state, {
          inputBuffer: _s.splice(state.inputBuffer, position, 1, ''),
          commandSuggestion: null,
          cursorPosition: state.cursorPosition - 1,
        });
      })(action);

    case ActionTypes.INPUT_TO_SHELL:
      return (({ input, position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length;
        }
        return Object.assign({}, state, {
          inputBuffer: _s.insert(state.inputBuffer, position, input),
          commandSuggestion: null,
          cursorPosition: state.cursorPosition + input.length,
        });
      })(action);

    case ActionTypes.MOVE_CURSOR:
      return (({ position, relativePosition }) => {
        let nextPosition = 0;
        if (typeof position === 'number') {
          nextPosition = position;
        } else if (typeof relativePosition === 'number') {
          nextPosition = state.cursorPosition + relativePosition;
        }
        const maxPosition = Math.min(SCREEN_WIDTH - 1, state.inputBuffer.length);
        nextPosition = Math.min(Math.max(nextPosition, 0), maxPosition);
        return Object.assign({}, state, {
          commandSuggestion: null,
          cursorPosition: nextPosition,
        });
      })(action);

    default:
      return state;
  }
}
