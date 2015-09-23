import keymirror from 'keymirror';

import Model from './Model';


const PLAYER_STATE_CODES = keymirror({
  ADVENTURING: null,
  BATTLING: null,
  IN_PREPARATION: null,
  WAITING: null,
});

export default class GameModel extends Model {

  constructor(...args) {
    super(...args);

    // TMP:
    this._isCharacterSelected = true;
    this._isAdventuring = false;
    this._isBattling = false;
  }

  /*
   * Returns broad player's state by code
   * Mainly for shell-input switching
   *
   * @return {string} PLAYER_STATE_CODES
   */
  getPlayerStateCode() {
    if (this._isBattling) {
      return PLAYER_STATE_CODES.BATTLING;
    } else if (this._isAdventuring) {
      return PLAYER_STATE_CODES.ADVENTURING;
    } else if (this._isCharacterSelected) {
      return PLAYER_STATE_CODES.IN_PREPARATION;
    }
    return PLAYER_STATE_CODES.WAITING;
  }
}

Object.assign(GameModel, {
  PLAYER_STATE_CODES,
});
