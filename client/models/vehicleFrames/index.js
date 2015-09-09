import _s from 'underscore.string';

import Model from '../Model';
import { createCounter, dictionarize } from 'lib/util';


function classifyTypeId(typeId) {
  return _s.classify(typeId) + 'VehicleFrameModel';
}


export class VehicleFrameModel extends Model {

  constructor(...args) {
    super(...args);

    this._weight = 0;
    this._maxWeight = 0;
    this._fuelEfficiency = 1;
    this._maxArmorPower = 0;
    this._operability = 0;
    this._maxMainGunCount = 0;
    this._maxSubGunCount = 0;
    this._maxStaffCount = 1;
  }
}

Object.assign(VehicleFrameModel, {
  typeId: '_vehicle_frame',
  sortOrder: 0,
});


//
// 種別の参考：
// Ref) http://vehicleshowcase.madmaxmovie.com/
//
// coupe 小型、軽く小回りは効くが弱い
// wagon 小型、低速だが高積載
// beetle (from volkswagen) 小型、全般的に高性能
// spiked 小型、トゲトゲ付き
// classic 小型、全般的に弱いが特殊能力有り
// jeep 中型、丈夫、軽量
// deluxe_car (from cadillac) 中型、平均的な性能
// armored-deluxe (from coupled-cadillac) 上記に＋装甲＋武器、しかし＋重量
// supercar (from interceptor) 中型、全般的にかなり強い
// trailer 大型、超積載、高装甲、高重量、低速
// truck 大型、トレイラーよりバランス型
// doof-wagon 大型、最強
//
//
// 重量に関して：
// Ref) http://greeco-channel.com/car/top100/body_weight_ranking/
//
// ざっくりで
// 小型 = 1.0 - 1.5 t
// 中型 = 2.0 - 3.0 t
// 大型 = とても重い
//

let modelList = [];

[
  {
    typeId: 'coupe',
    props: {
      _weight: 300,
      _maxWeight: 1000,
      _fuelEfficiency: 5,
      _maxArmorPower: 40,
      _operability: 5,
      _maxSubGunCount: 2,
      _maxStaffCount: 3,
    }
  },
  {
    typeId: 'wagon',
    props: {
      _weight: 800,
      _maxWeight: 2000,
      _fuelEfficiency: 3,
      _maxArmorPower: 65,
      _operability: 2,
      _maxMainGunCount: 1,
      _maxSubGunCount: 1,
      _maxStaffCount: 8,
    }
  },
  {
    typeId: 'deluxe_car',
    props: {
      _weight: 1500,
      _maxWeight: 2500,
      _fuelEfficiency: 3,
      _maxArmorPower: 100,
      _operability: 3,
      _maxMainGunCount: 1,
      _maxSubGunCount: 2,
      _maxStaffCount: 6,
    }
  },
  {
    typeId: 'supercar',
    props: {
      _weight: 1000,
      _maxWeight: 2500,
      _fuelEfficiency: 4,
      _maxArmorPower: 125,
      _operability: 4,
      _maxMainGunCount: 2,
      _maxSubGunCount: 1,
      _maxStaffCount: 4,
    }
  },
].forEach(({ typeId, props }, idx) => {

  const SubVehicleFrameModel = class SubVehicleFrameModel extends VehicleFrameModel {
    constructor(...args) {
      super(...args);
      Object.assign(this, props);
    }
  };

  Object.assign(SubVehicleFrameModel, {
    typeId,
    sortOrder: idx + 1,
  });

  exports[classifyTypeId(typeId)] = SubVehicleFrameModel;
  modelList.push(SubVehicleFrameModel);
});


export const vehicleFrameList = modelList;
export const vehicleFrames = dictionarize(vehicleFrameList, 'typeId');
