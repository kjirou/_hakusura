import Model from './Model';


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
    const stateDiff = resolver.tryToResolve({
      adventurer: this._adventurer,
      dungeonCardList: this._dungeonCardList,
    });
    return stateDiff;
  }
}
