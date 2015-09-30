import { generatePrompt } from 'lib/text-processor';


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

  terminalState = Object.assign({}, terminalState, {
    inputBuffer: '',
    outputLines: newOutputLines,
    shellInputMode: newShellInputMode,
    cursorPosition: 0,
  });

  return terminalState;
}

