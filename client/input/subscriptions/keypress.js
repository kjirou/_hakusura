import EventTypes from 'consts/EventTypes';
import { STAGE_SELECTION } from 'consts/Keys';
import AppEvent from 'containers/AppEvent';
import AppStore from 'containers/AppStore';


function acceptKeyOnWelcomePage(state, keyName, keySequence, isControl) {
  const { dispatchers } = AppStore.getInstance();

  const stageTypeId = STAGE_SELECTION[keySequence];
  if (stageTypeId) {
    dispatchers.startGame(stageTypeId);
    return true;
  }

  return false;
}

function acceptKeyOnGamePage(state, keyName, keySequence, isControl) {
  const { dispatchers } = AppStore.getInstance();

  dispatchers.changePage('welcome');
  return true;
  return false;
}


export function onKeypress({ name: keyName, sequence: keySequence, ctrl: isControl }) {
  const {emitter} = AppEvent.getInstance();
  const {store} = AppStore.getInstance();
  const state = store.getState();

  if (keyName === 'escape' || isControl && keyName === 'c') {
    emitter.emit(EventTypes.EXIT_SCREEN);
    return;
  }

  const acceptKeyByActivePage = {
    game: acceptKeyOnGamePage,
    welcome: acceptKeyOnWelcomePage
  }[state.screen.activePageId];

  if (!acceptKeyByActivePage) {
    const err = new Error(state.screen.activePageId + ' is invalid pageId');
    emitter.emit(EventTypes.THROW_RUNTIME_ERROR, err);
    return;
  }

  if (acceptKeyByActivePage(state, keyName, keySequence, isControl)) {
    return;
  }
}
