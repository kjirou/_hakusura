import assert from 'power-assert';

import {
  ReciprocatingEngineModel,
  EngineModel,
  engineList,
  engines,
} from 'models/engines';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof EngineModel, 'function');
    assert(Array.isArray(engineList));
    assert(engineList.length > 0);
    assert.strictEqual(typeof engines, 'object');
    assert(Object.keys(engines).length > 0);
  });

  it('should create a instance by sub class', function() {
    const model = new ReciprocatingEngineModel();
    assert(model.getOperability() > 0);
  });
});
