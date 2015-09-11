import assert from 'assert'

import Model from 'models/Model';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Model, 'function');
  });
});
