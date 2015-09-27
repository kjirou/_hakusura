import _s from 'underscore.string';

import {
  syncTerminalStateByInputBufferChange,
} from './shared';
import ActionTypes from 'consts/ActionTypes';
import { SCREEN_WIDTH } from 'consts/ViewProps';
import ShellInputModes from 'consts/ShellInputModes';
import { generatePrompt } from 'lib/text-processor';


const initialState = (() => {
  const inputBuffer = '';
  return {
    shellInputMode: ShellInputModes.DEFAULT,
    inputBuffer: inputBuffer,
    cursorPosition: 0,
    outputLines: [],
    shellLines: [inputBuffer],
  };
})();

export default function terminalReducer(state = initialState, action = { type: '_init' }) {

  switch (action.type) {

    case ActionTypes.DELETE_CHARACTER_FROM_SHELL:
      return (({ position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length - 1;
        }
        if (position < 0) {
          return state;
        }
        const inputBuffer = _s.splice(state.inputBuffer, position, 1, '');
        state = syncTerminalStateByInputBufferChange(state, inputBuffer);
        state = Object.assign({}, state, {
          cursorPosition: state.cursorPosition - 1,
        });
        return state;
      })(action);

    // TODO: shellLines, outputLines
    case ActionTypes.UPDATE_SHELL:
      return (({ inputBuffer }) => {
        return syncTerminalStateByInputBufferChange(state, inputBuffer);
      })(action);

    case ActionTypes.INPUT_TO_SHELL:
      return (({ input, position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length;
        }
        const inputBuffer = _s.insert(state.inputBuffer, position, input);
        state = syncTerminalStateByInputBufferChange(state, inputBuffer);
        state = Object.assign({}, state, {
          cursorPosition: state.cursorPosition + input.length,
        });
        return state;
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
          cursorPosition: nextPosition,
        });
      })(action);

    default:
      return state;
  }
}
