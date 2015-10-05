import SingletonMixin from 'singleton-mixin';

import CharacterListModel from 'models/CharacterListModel';
import GameModel from 'models/GameModel';
import WindowHistoryListModel from 'models/WindowHistoryListModel';


export default class AppModel {

  constructor() {
    this._characterList = new CharacterListModel();
    this._game = new GameModel();
    this._windowHistoryList = new WindowHistoryListModel();
  }

  get characterList() {
    return this._characterList;
  }

  get game() {
    return this._game;
  }

  get windowHistoryList() {
    return this._windowHistoryList;
  }
}

Object.assign(AppModel, SingletonMixin);
