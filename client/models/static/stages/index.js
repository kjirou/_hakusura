import _s from 'underscore.string';

import AutomaticNamingMixin from '../../mixins/AutomaticNamingMixin';
import { dictionarize } from 'lib/util';


let objectList = [];

export const Stage = Object.assign({
  typeId: '_stage',
  sortOrder: 0,
  description: '----',
}, AutomaticNamingMixin);

[
  {
    typeId: 'a_small_sized_car',
  },
  {
    typeId: 'a_medium_sized_car',
  },
  {
    typeId: 'a_large_sized_car',
  },
  {
    typeId: 'interceptor',
  },
  {
    typeId: 'the_war_rig',
  },
  {
    typeId: 'the_nux_car',
  },
  {
    typeId: 'the_peacemaker',
  },
  {
    typeId: 'doof_wagon',
  },
].forEach((props, idx) => {
  let obj = exports[_s.classify(props.typeId) + 'Stage'] = Object.assign({}, Stage, props, {
    sortOrder: idx + 1,
  });
  objectList.push(obj);
});

export const stageList = objectList;
export const stages = dictionarize(objectList, 'typeId');
