import EventTypes from 'consts/EventTypes';
import AppEvent from 'containers/AppEvent';
import AppStore from 'containers/AppStore';


function acceptKeyOnWelcomePage(state, dispatchers, keyName, keySequence, isControl) {
  dispatchers.screen.changePage('game');
  return true;
  return false;
}

function acceptKeyOnGamePage(state, dispatchers, keyName, keySequence, isControl) {
  dispatchers.screen.changePage('welcome');
  return true;
  return false;
}


export function onKeypress({ name, sequence, ctrl }) {
  const {emitter} = AppEvent.getInstance();
  const {dispatchers, store} = AppStore.getInstance();
  const state = store.getState();

  if (name === 'escape' || ctrl && name === 'c') {
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

  if (acceptKeyByActivePage(state, dispatchers, name, sequence, ctrl)) {
    return;
  }
}
