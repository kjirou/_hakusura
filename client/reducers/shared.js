import { generatePrompt } from 'lib/text-processor';


export function syncTerminalStateByInputBufferChange(terminalState, newInputBuffer) {
  const shellLines = terminalState.shellLines.slice();
  shellLines[0] = newInputBuffer;
  return Object.assign({}, terminalState, {
    inputBuffer: newInputBuffer,
    shellLines,
  });
}

export function syncTerminalStateByCommandExecution(
  terminalState,
  { newShellInputMode = null, input = null, output = null }
) {
  const newOutputLines = terminalState.outputLines.slice();
  if (input !== null) {
    // Use old shellInputMode
    newOutputLines.unshift(generatePrompt(terminalState.shellInputMode) + input);
  }
  if (output !== null) {
    newOutputLines.unshift(output);
  }
  newShellInputMode = newShellInputMode || terminalState.shellInputMode;

  terminalState = syncTerminalStateByInputBufferChange(terminalState, '');
  terminalState = Object.assign({}, terminalState, {
    outputLines: newOutputLines,
    shellInputMode: newShellInputMode,
    cursorPosition: 0,
  });

  return terminalState;
}

