import keymirror from 'keymirror';

import Model from './Model';


const ADVENTURE_STATE_CODES = keymirror({
  CONTINUATION: null,
  DEFEAT: null,
  VICTORY: null,
});


export default class AdventureModel extends Model {

  constructor({ adventurer }, ...args) {
    super(...args);

    this._adventurer = adventurer;

    // TMP:
    this._dungeonCardList = Array.from({ length: 50 }).map((v, idx) => {
      return {
        seq: idx + 1,  // TMP:
      };
    });
  }

  get dungeonCardList() {
    return this._dungeonCardList;
  }

  /*
   * Discard first dungeon card on the board
   */
  _discardDungeonCard() {
    this._dungeonCardList.shift();
  }

  _getResolvers() {

    // TMP:
    const toResolver = (subject) => {
      return {
        _subject: subject,
        tryToResolve(situation) {
          situation.dungeonCardList.shift();
          const stateDiff = {
            discardedDungeonCardIndexes: [0],
          };
          return stateDiff;
        },
      };
    };

    return (
      [
        toResolver(this._adventurer),
        //...this._dungeonCardList,
      ]
      .filter(() => true)
    );
  }

  _getNextResolver() {
    return (this._getResolvers()
      .sort()
    )[0] || null;
  }

  _getStateCode() {
    if (0) {  // adventurer is dead
      return ADVENTURE_STATE_CODES.DEFEAT;
    } else if (this._dungeonCardList.length === 0) {
      return ADVENTURE_STATE_CODES.VICTORY;
    }
    return ADVENTURE_STATE_CODES.CONTINUATION;
  }

  /*
   * @return {object} - Specification of the difference in before and after the anyone's solution.
   *                    They are in for animation mainly.
   *                    For example, if it does not exist,
   *                    "100hp - 20dmg = 80hp" and "100hp - (10dmg * 2) = 80hp" becomes the same in the View.
   */
  proceed() {
    const resolver = this._getNextResolver();
    if (!resolver) {
      throw new Error('Can not find next resovler');
    }

    const resolutionStateDiff = resolver.tryToResolve({
      adventurer: this._adventurer,
      dungeonCardList: this._dungeonCardList,
    });

    const adventureStateCode = this._getStateCode();

    // TODO: Judge the adventure ending & Determine rewards and damages
    const report = {
      obtainedExp: 1,
      obtainedMoney: 1,
      obtainedEquipments: [],
    };
    switch (adventureStateCode) {
      case ADVENTURE_STATE_CODES.DEFEAT:
        Object.assign(report, {});
        break;
      case ADVENTURE_STATE_CODES.VICTORY:
        Object.assign(report, {});
        break;
    }

    return {
      adventureStateCode,
      resolutionStateDiff,
      report,
    };
  }
}

Object.assign(AdventureModel, {
  ADVENTURE_STATE_CODES,
});
