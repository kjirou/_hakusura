import ShellInputModes from 'consts/ShellInputModes';


export function generatePrompt(shellInputMode) {
  return {
    [ShellInputModes.ADVENTURE]: 'adventure> ',
    [ShellInputModes.BATTLE]: 'battle> ',
    [ShellInputModes.WIZARD]: 'wizard> ',
  }[shellInputMode] || '> ';
}
