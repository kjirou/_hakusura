import _s from 'underscore.string';

import Model from '../Model';
import AutomaticNamingMixin from '../mixins/AutomaticNamingMixin';
import ParametersMixin from '../mixins/ParametersMixin';
import { dictionarize } from 'lib/util';


function classifyTypeId(typeId) {
  return _s.classify(typeId) + 'EngineModel';
}


export class EngineModel extends Model {
}

Object.assign(EngineModel.prototype, AutomaticNamingMixin, ParametersMixin);
Object.assign(EngineModel, {
  typeId: '_engine',
  sortOrder: 0,
});


//
// Engines
//
// - http://www.a-nob.com/engine-type.html
//


let modelList = [];

[
  {
    typeId: 'reciprocating',
    props: {
      _weight: 150,
      _maxWeight: 1000,
      _maxArmorPower: 25,
      _operability: 3,
      _speed: 5,
    }
  },
  {
    typeId: 'rotary',
    props: {
      _weight: 100,
      _maxWeight: 1000,
      _maxArmorPower: 20,
      _fuelEfficiencyRate: 1.25,
      _operability: 1,
      _speed: 7,
    }
  },
  {
    typeId: 'diesel',
    props: {
      _weight: 250,
      _maxWeight: 1500,
      _maxArmorPower: 40,
      _fuelEfficiencyRate: 1.5,
      _operability: 3,
      _speed: 3,
    }
  },
  {
    typeId: 'hybrid',
    props: {
      _weight: 200,
      _maxWeight: 1000,
      _maxArmorPower: 10,
      _fuelEfficiencyRate: 1.25,
      _operability: 4,
      _speed: 6,
    }
  },
].forEach(({ typeId, props }, idx) => {

  const SubEngineModel = class SubEngineModel extends EngineModel {
    constructor(...args) {
      super(...args);
      Object.assign(this, props);
    }
  };

  Object.assign(SubEngineModel, {
    typeId,
    sortOrder: idx + 1,
  });

  exports[classifyTypeId(typeId)] = SubEngineModel;
  modelList.push(SubEngineModel);
});


export const engineList = modelList;
export const engines = dictionarize(engineList, 'typeId');
