import assert from 'power-assert';

import CharacterModel from 'models/creatures/CharacterModel';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should create a instance', function() {
    let model = new CharacterModel();
  });


  context('parameters', function() {

    it('getName', function() {
      const model = new CharacterModel();
      model._name = 'Taro';
      assert.strictEqual(model.getName(), 'Taro');
    });
  });
});
