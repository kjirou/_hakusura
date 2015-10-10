import Model from './Model';


export default class AdventureModel extends Model {

  constructor(...args) {
    super(...args);

    // TMP:
    this._dungeonCardList = Array.from({ length: 50 }).map(() => {
      return {
      };
    });
  }

  goAhead() {
    this._dungeonCardList.shift();
  }
}
