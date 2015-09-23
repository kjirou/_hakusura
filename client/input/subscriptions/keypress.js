import alphabet from 'alphabet';

import EventTypes from 'consts/EventTypes';
import { STAGE_SELECTION } from 'consts/Keys';
import AppEvent from 'containers/AppEvent';
import AppStore from 'containers/AppStore';


const WRITABLE_KEYS = [
  ...(alphabet.slice()),
  ...('0123456789'.split('')),
  ' ',
  '"',
  '\'',
  '-',
  '_',
];

const BACKSPACE_KEYS = [
  'backspace',
  'delete',
];

export function onKeypress({ name: keyName, sequence: keySequence, ctrl: isEnabledControl }) {
  const { emitter } = AppEvent.getInstance();
  const { dispatchers, store } = AppStore.getInstance();
  const state = store.getState();

  if (keyName === 'escape' || isEnabledControl && keyName === 'c') {
    // TODO: show confirmation dialog
    emitter.emit(EventTypes.EXIT_SCREEN);
    return;
  }

  if (keyName === 'left') {
    dispatchers.terminal.moveCursorByRelative(-1);
    return;
  }
  if (keyName === 'right') {
    dispatchers.terminal.moveCursorByRelative(1);
    return;
  }
  if (isEnabledControl && keyName === 'a') {
    dispatchers.terminal.moveCursor(0);
    return;
  }
  if (isEnabledControl && keyName === 'e') {
    dispatchers.terminal.moveCursor(9999);
    return;
  }

  if (BACKSPACE_KEYS.indexOf(keyName) > -1) {
    dispatchers.terminal.deleteCharacterFromShell({
      position: state.terminal.cursorPosition - 1,
    });
    return;
  }

  if (WRITABLE_KEYS.indexOf(keySequence) > -1) {
    dispatchers.terminal.inputToShell(keySequence, {
      position: state.terminal.cursorPosition,
    });
    return;
  }

  if (keyName === 'enter') {
    dispatchers.terminal.executeCommand(state.terminal.inputBuffer, {
      shellInputMode: state.terminal.shellInputMode,
    });
    return;
  }
}
