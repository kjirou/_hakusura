import { aggregators } from 'rpgparameter';

import Model from '../Model';


export default class VehicleModel extends Model {

  constructor(...args) {
    super(...args);

    this._vehicleFrame = null;
    this._armor = null;
    this._engine = null;
    this._fuelTank = null;
    this._wheels = null;
    this._mainGuns = [];
    this._subGuns = [];
    this._staffs = [];
  }

  _getEquipmentList() {
    return [
      this._vehicleFrame,
      this._armor,
      this._engine,
      this._fuelTank,
      this._wheels,
      ...(this._mainGuns),
      ...(this._subGuns),
    ].filter(v => Boolean(v));
  }

  get weight() {
    let params = this._getEquipmentList().map(v => v.getWeight());
    return aggregators.aggregateNumbers(params);
  }

  get maxWeight() {
    let params = this._getEquipmentList().map(v => v.getMaxWeight());
    return aggregators.aggregateNumbers(params);
  }

  get maxArmorPower() {
    let params = [
      this._vehicleFrame
    ].map(v => v.getMaxArmorPower());
    return aggregators.aggregateNumbers(params);
  }

  get maxShieldEnergy() {
    let params = this._getEquipmentList().map(v => v.getMaxShieldEnergy());
    return aggregators.aggregateNumbers(params);
  }

  get maxFuel() {
    let params = this._getEquipmentList().map(v => v.getMaxFuel());
    return aggregators.aggregateNumbers(params);
  }

  get maxAmmo() {
    let params = this._getEquipmentList().map(v => v.getMaxAmmo());
    return aggregators.aggregateNumbers(params);
  }

  get fuelEfficiencyRate() {
    let params = this._getEquipmentList().map(v => v.getFuelEfficiencyRate());
    return aggregators.aggregateRates(params);
  }

  get shieldHardness() {
    let params = this._getEquipmentList().map(v => v.getShieldHardness());
    return aggregators.aggregateNumbers(params);
  }

  get operability() {
    let params = this._getEquipmentList().map(v => v.getOperability());
    return aggregators.aggregateNumbers(params);
  }

  get speed() {
    let params = this._getEquipmentList().map(v => v.getSpeed());
    return aggregators.aggregateNumbers(params);
  }

  get maxMainGunCount() {
    let params = this._getEquipmentList().map(v => v.getMaxMainGunCount());
    return aggregators.aggregateNumbers(params);
  }

  get maxSubGunCount() {
    let params = this._getEquipmentList().map(v => v.getMaxSubGunCount());
    return aggregators.aggregateNumbers(params);
  }

  get maxStaffCount() {
    let params = this._getEquipmentList().map(v => v.getMaxStaffCount());
    return aggregators.aggregateNumbers(params);
  }

  /*
   * Cut variable state by limits of min/max/etc
   */
  _adaptState() {
    // TODO
  }

  set vehicleFrame(v) {
    this._vehicleFrame = v;
    this._adaptState();
  }

  set armor(v) {
    this._armor = v;
    this._adaptState();
  }

  set engine(v) {
    this._engine = v;
    this._adaptState();
  }

  set fuelTank(v) {
    this._fuelTank = v;
    this._adaptState();
  }

  set wheels(v) {
    this._wheels = v;
    this._adaptState();
  }
}
