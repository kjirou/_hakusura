import assert from 'power-assert';

import CreatureModel from 'models/creatures/CreatureModel';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should create a instance', function() {
    let model = new CreatureModel();
  });


  describe('parameters', function() {

    //it('weight', function() {
    //  let engine = new EngineModel();
    //  engine.setWeight(100);
    //  let model = new VehicleModel();
    //  model.engine = engine;
    //  assert.strictEqual(model.weight, 100);
    //});
  });
});
