import SingletonMixin from 'singleton-mixin';

import GameModel from 'models/GameModel';


export default class AppModel {

  constructor() {
    this._game = new GameModel();
  }

  get game() {
    return this._game;
  }
}

Object.assign(AppModel, SingletonMixin);
