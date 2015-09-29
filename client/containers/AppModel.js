import SingletonMixin from 'singleton-mixin';

import CharacterListModel from 'models/CharacterListModel';
import GameModel from 'models/GameModel';


export default class AppModel {

  constructor() {
    this._characterList = new CharacterListModel();
    this._game = new GameModel();
  }

  get characterList() {
    return this._characterList;
  }

  get game() {
    return this._game;
  }
}

Object.assign(AppModel, SingletonMixin);
