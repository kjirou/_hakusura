import assert from 'power-assert';

import AppModel from 'containers/AppModel';
import { clearApp, heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(clearApp);

  it('should create a instance', function() {
    const model = AppModel.getInstance();

    assert.strictEqual(typeof model.game, 'object');
    assert.strictEqual(typeof model.characterList, 'object');
  });
});
