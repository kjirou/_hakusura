import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import ShellInputModes from 'consts/ShellInputModes';
import { generatePrompt } from 'lib/text-processor';


const initialState = (() => {
  const inputBuffer = '';
  return {
    shellInputMode: ShellInputModes.DEFAULT,
    inputBuffer: inputBuffer,
    outputLines: [],
    shellLines: [inputBuffer],
  };
})();

function syncStateByInputBufferChange(state, newInputBuffer) {
  const shellLines = state.shellLines.slice();
  shellLines[0] = newInputBuffer;
  return Object.assign({}, state, {
    inputBuffer: newInputBuffer,
    shellLines,
  });
}

export default function terminalReducer(state = initialState, action = { type: '_init' }) {

  switch (action.type) {

    case ActionTypes.APPLY_COMMAND_EXECUTION:
      return (({ input, output, shellInputMode }) => {
        const additionalOutputLines = [generatePrompt(state.shellInputMode) + input];
        if (typeof output === 'string') {
          additionalOutputLines.unshift(output);
        }

        state = syncStateByInputBufferChange(state, '');
        state = Object.assign({}, state, {
          outputLines: [...additionalOutputLines, ...state.outputLines],
          shellInputMode: shellInputMode ? shellInputMode : state.shellInputMode,
        });
        return state;
      })(action);

    case ActionTypes.DELETE_CHARACTER_FROM_SHELL:
      return (({ position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length - 1;
        }
        const inputBuffer = _s.splice(state.inputBuffer, position, 1, '');
        return syncStateByInputBufferChange(state, inputBuffer);
      })(action);

    // TODO: shellLines, outputLines
    case ActionTypes.UPDATE_SHELL:
      return (({ inputBuffer }) => {
        return syncStateByInputBufferChange(state, inputBuffer);
      })(action);

    case ActionTypes.INPUT_TO_SHELL:
      return (({ input, position }) => {
        if (position === undefined || position === null) {
          position = state.inputBuffer.length;
        }
        const inputBuffer = _s.insert(state.inputBuffer, position, input);
        return syncStateByInputBufferChange(state, inputBuffer);
      })(action);

    default:
      return state;
  }
}
