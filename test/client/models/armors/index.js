import assert from 'power-assert';

//import {
//  WoodPlateArmorModel,
//  ArmorModel,
//  armorList,
//  armors,
//} from 'models/armors';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', undefined, function() {
    assert.strictEqual(typeof ArmorModel, 'function');
    assert(Array.isArray(armorList));
    assert(armorList.length > 0);
    assert.strictEqual(typeof armors, 'object');
    assert(Object.keys(armors).length > 0);
  });

  it('should create a instance by sub class', undefined, function() {
    const model = new WoodPlateArmorModel();
    assert(model.getShieldHardness() > 0);
  });
});
