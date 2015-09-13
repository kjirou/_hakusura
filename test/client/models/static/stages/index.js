import assert from 'power-assert';

import {
  ASmallSizedCarStage,
  Stage,
  stageList,
  stages,
} from 'models/static/stages';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Stage, 'object');
    assert(Array.isArray(stageList));
    assert(stageList.length > 0);
    assert.strictEqual(typeof stages, 'object');
    assert(Object.keys(stages).length > 0);
  });

  it('should be defined props to data', function() {
    assert.strictEqual(ASmallSizedCarStage.getName(), 'A Small Sized Car');
  });
});
