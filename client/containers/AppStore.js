import { bindActionCreators, createStore } from 'redux';
import SingletonMixin from 'singleton-mixin';

import ScreenActionCreators from 'actions/ScreenActionCreators';
import TerminalActionCreators from 'actions/TerminalActionCreators';
import TimeActionCreators from 'actions/TimeActionCreators';
import rootReducer from 'reducers';


export default class AppStore {

  constructor() {
    const store = createStore(rootReducer);
    this._dispatchers = {
      screen: bindActionCreators(ScreenActionCreators, store.dispatch),
      terminal: bindActionCreators(TerminalActionCreators, store.dispatch),
      time: bindActionCreators(TimeActionCreators, store.dispatch),
    };
    this._store = store;
  }

  get store() {
    return this._store;
  }

  get dispatchers() {
    return this._dispatchers;
  }
}

Object.assign(AppStore, SingletonMixin);
