import _ from 'lodash';
import assert from 'power-assert';

import AdventureModel from 'client/models/AdventureModel';
import CharacterModel from 'client/models/creatures/CharacterModel';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  const _createInstance = () => {
    return new AdventureModel({
      adventurer: new CharacterModel()
    });
  }

  it('should be', () => {
    _createInstance();
  });

  it('_getResolvers', () => {
    const model = _createInstance();
    const resolvers = model._getResolvers();
    assert(Array.isArray(resolvers));
  });

  it('_getNextResolver', () => {
    const model = _createInstance();
    const resolver = model._getNextResolver();
  });

  it('proceed', () => {
    const model = _createInstance();
    const stateDiff = model.proceed();
    assert(_.isPlainObject(stateDiff));
  });
});
