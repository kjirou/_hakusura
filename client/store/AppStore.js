import {bindActionCreators, createStore} from 'redux';

import ScreenActionCreators from 'actions/ScreenActionCreators';
import SingletonMixin from 'lib/SingletonMixin';
import rootReducer from 'reducers';


class AppStore {

  constructor() {
    this._store = createStore(rootReducer);
    this._dispatchers = {
      screen: bindActionCreators(ScreenActionCreators, this._store.dispatch)
    };
  }

  get store() {
    return this._store;
  }

  get dispatchers() {
    return this._dispatchers;
  }
}

Object.assign(AppStore, SingletonMixin);

export default AppStore;
