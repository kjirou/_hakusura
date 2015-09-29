import alphabet from 'alphabet';

import EventTypes from 'consts/EventTypes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';
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
  '.',
  ':',
  ';',
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

  if (keyName === 'up') {
    if (state.window.windowContentType === WINDOW_CONTENT_TYPES.INDEX) {
      dispatchers.terminal.moveIndexWindowCursor(-1);
      return;
    }
  }

  if (keyName === 'down') {
    if (state.window.windowContentType === WINDOW_CONTENT_TYPES.INDEX) {
      dispatchers.terminal.moveIndexWindowCursor(1);
      return;
    }
  }

  if (keyName === 'left') {
    if (state.window.windowContentType === WINDOW_CONTENT_TYPES.INDEX) {
      dispatchers.terminal.executeCommand(
        state.terminal.shellInputMode,
        state.indexWindow.leftCommand,
        { silent: true }
      );
      return;
    } else {
      dispatchers.terminal.moveCursorByRelative(-1);
      return;
    }
  }

  if (keyName === 'right') {
    if (state.window.windowContentType === WINDOW_CONTENT_TYPES.INDEX) {
      dispatchers.terminal.executeCommand(
        state.terminal.shellInputMode,
        state.indexWindow.rightCommand,
        { silent: true }
      );
      return;
    } else {
      dispatchers.terminal.moveCursorByRelative(1);
      return;
    };
  }

  if (keyName === 'space') {
    if (state.window.windowContentType === WINDOW_CONTENT_TYPES.INDEX) {
      dispatchers.terminal.executeCommand(
        state.terminal.shellInputMode,
        state.indexWindow.spaceCommand,
        { silent: true }
      );
      return;
    }
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
    dispatchers.terminal.executeCommand(state.terminal.shellInputMode, state.terminal.inputBuffer);
    return;
  }
}
