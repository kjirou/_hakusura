import keymirror from 'keymirror';

import AdventureModel from './AdventureModel';
import Model from './Model';
import CharacterModel from './creatures/CharacterModel';


const PLAYER_STATE_CODES = keymirror({
  ADVENTURING: null,
  IN_PREPARATION: null,
  WAITING: null,
});

/*
 * Interface to put together references
 *   from the outside into the game
 */
export default class GameModel extends Model {

  constructor(...args) {
    super(...args);

    this._adventurer = null;
    this._adventure = null;
  }

  get adventure() {
    return this._adventure;
  }

  /*
   * Returns broad player's state by code
   * Mainly for shell-input switching
   *
   * @return {string} PLAYER_STATE_CODES
   */
  getPlayerStateCode() {
    if (this._adventure) {
      return PLAYER_STATE_CODES.ADVENTURING;
    } else if (this._adventurer) {
      return PLAYER_STATE_CODES.IN_PREPARATION;
    }
    return PLAYER_STATE_CODES.WAITING;
  }

  prepareAdventurer() {
    if (this.getPlayerStateCode() !== PLAYER_STATE_CODES.WAITING) {
      throw new Error('Unexpected situation');
    }
    // TMP:
    this._adventurer = new CharacterModel();
    this._adventurer._name = 'Tmp Man';
  }

  prepareAdventure() {
    if (this.getPlayerStateCode() !== PLAYER_STATE_CODES.IN_PREPARATION) {
      throw new Error('Lack of preparation for the adventure');
    }
    this._adventure = new AdventureModel({
      adventurer: this._adventurer,
    });
  }
}

Object.assign(GameModel, {
  PLAYER_STATE_CODES,
});
