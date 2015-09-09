import _s from 'underscore.string';

import Model from '../Model';
import { dictionarize } from 'lib/util';


function classifyTypeId(typeId) {
  return _s.classify(typeId) + 'ArmorModel';
}


export class ArmorModel extends Model {

  constructor(...args) {
    super(...args);

    this._weight = 0;
    this._armorPower = 0;
    this._shieldPower = 0,
    this._maxShieldEnergy = 0;
  }
}

Object.assign(ArmorModel, {
  typeId: '_armor',
  sortOrder: 0,
});


//
// spiked
// reactive
//


let modelList = [];

[
  {
    typeId: 'wood_plate',
    props: {
      _weight: 50,
      _shieldPower: 2,
      _maxShieldEnergy: 25,
    }
  },
  {
    typeId: 'iron_plate',
    props: {
      _weight: 300,
      _shieldPower: 5,
      _maxShieldEnergy: 50,
    }
  },
  {
    typeId: 'steel_plate',
    props: {
      _weight: 300,
      _shieldPower: 6,
      _maxShieldEnergy: 60,
    }
  },
  {
    typeId: 'carbon_fiber',
    props: {
      _weight: 25,
      _shieldPower: 5,
      _maxShieldEnergy: 50,
    }
  },
  {
    typeId: 'reactive',
    props: {
      _weight: 500,
      _shieldPower: 20,
      _maxShieldEnergy: 40,
    }
  },
].forEach(({ typeId, props }, idx) => {

  const SubArmorModel = class SubArmorModel extends ArmorModel {
    constructor(...args) {
      super(...args);
      Object.assign(this, props);
    }
  };

  Object.assign(SubArmorModel, {
    typeId,
    sortOrder: idx + 1,
  });

  exports[classifyTypeId(typeId)] = SubArmorModel;
  modelList.push(SubArmorModel);
});


export const armorList = modelList;
export const armors = dictionarize(armorList, 'typeId');
