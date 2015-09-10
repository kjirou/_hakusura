import _s from 'underscore.string';

import Model from '../Model';
import AutomaticNamingMixin from '../mixins/AutomaticNamingMixin';
import ParametersMixin from '../mixins/ParametersMixin';
import { dictionarize } from 'lib/util';


function classifyTypeId(typeId) {
  return _s.classify(typeId) + 'ArmorModel';
}


export class ArmorModel extends Model {
}

Object.assign(ArmorModel.prototype, AutomaticNamingMixin, ParametersMixin);
Object.assign(ArmorModel, {
  typeId: '_armor',
  sortOrder: 0,
});


//
// TODO:
// - spiked
//


let modelList = [];

[
  {
    typeId: 'wood_plate',
    props: {
      _weight: 50,
      _shieldHardness: 2,
      _maxShieldEnergy: 25,
    }
  },
  {
    typeId: 'iron_plate',
    props: {
      _weight: 300,
      _shieldHardness: 5,
      _maxShieldEnergy: 50,
    }
  },
  {
    typeId: 'steel_plate',
    props: {
      _weight: 300,
      _shieldHardness: 6,
      _maxShieldEnergy: 60,
    }
  },
  {
    typeId: 'carbon_fiber',
    props: {
      _weight: 25,
      _shieldHardness: 5,
      _maxShieldEnergy: 50,
    }
  },
  {
    typeId: 'reactive',
    props: {
      _weight: 500,
      _shieldHardness: 5,
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
