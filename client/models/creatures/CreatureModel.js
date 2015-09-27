import { aggregators } from 'rpgparameter';

import Model from '../Model';


export default class CreatureModel extends Model {

  constructor(...args) {
    super(...args);
  }

  //_getEquipmentList() {
  //  return [
  //  ].filter(v => Boolean(v));
  //}

  //get weight() {
  //  let params = this._getEquipmentList().map(v => v.getWeight());
  //  return aggregators.aggregateNumbers(params);
  //}

  /*
   * Cut variable state by limits of min/max/etc
   */
  _adaptState() {
    // TODO
  }

  //set armor(v) {
  //  this._armor = v;
  //  this._adaptState();
  //}
}
