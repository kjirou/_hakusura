import _ from 'lodash';
import assert from 'power-assert';

import AdventureModel, {
  ADVENTURE_STATE_CODES,
} from 'client/models/AdventureModel';
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


  describe('proceed', () => {

    it('should be', () => {
      const model = _createInstance();
      const stateDiff = model.proceed();
      assert(_.isPlainObject(stateDiff));
    });

    it('lifecycle', () => {
      const model = _createInstance();
      model._dungeonCardList = [{}, {}];  // TMP:
      let proceedingResult = model.proceed();
      assert.strictEqual(proceedingResult.adventureStateCode, ADVENTURE_STATE_CODES.CONTINUATION);
      proceedingResult = model.proceed();
      assert.notStrictEqual(proceedingResult.adventureStateCode, ADVENTURE_STATE_CODES.CONTINUATION);
      assert.throws(() => {
        model.proceed();
      }, /over/);
    });
  });
});
