import assert from 'power-assert';

import Model from 'models/Model';
import ParametersMixin from 'models/mixins/ParametersMixin';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should extend Model', undefined, function() {
    class FooModel extends Model {
      constructor() {
        super();
        this._maxFuel = 10;
        this._fuelEfficiencyRate = 1.5;
      }
    }
    Object.assign(FooModel.prototype, ParametersMixin);

    const foo = new FooModel();
    assert.strictEqual(foo.getMaxFuel(), 10);
    assert.strictEqual(foo.getWeight(), 0);
    assert.strictEqual(foo.getFuelEfficiencyRate(), 1.5);
  });
});
