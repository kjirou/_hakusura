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
    // TODO: confirm dialog
    emitter.emit(EventTypes.EXIT_SCREEN);
    return;
  }

  if (BACKSPACE_KEYS.indexOf(keyName) > -1) {
    dispatchers.deleteCharacterFromShell();
    return;
  }

  if (WRITABLE_KEYS.indexOf(keySequence) > -1) {
    dispatchers.inputToShell(keySequence);
    return;
  }
}
