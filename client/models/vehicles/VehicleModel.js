import Model from '../Model';


export default class VehicleModel extends Model {

  constructor() {
    this._vehicleFrame = undefined;
    this._engine = undefined;
    this._fuelTank = undefined;
    this._wheels = undefined;
    this._armor = undefined;
    this._mainGuns = [];
    this._subGuns = [];
    this._staffs = [];
  }

  get weight() {
  }

  get maxWeight() {
    return 2000;
  }

  get fuel() {
  }

  get maxFuel() {
  }

  get armorPower() {
  }

  get maxArmorPower() {
    return 1;
  }

  get operability() {
    return 1;
  }

  get maxAmmoCount() {
  }

  get maxMainGunCount() {
    return 1;
  }

  get maxSubGunCount() {
    return 1;
  }

  get maxStaffCount() {
    return 5;
  }
}
