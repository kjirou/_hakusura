import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import timeReducer from 'reducers/time';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be', function() {
    let state = timeReducer();
    assert.strictEqual(state.appTime, 0);
    state = timeReducer(state, {
      type: ActionTypes.FORWARD_APP_TIME,
      appTime: 100,
    });
    assert.strictEqual(state.appTime, 100);
    state = timeReducer(state, {
      type: ActionTypes.FORWARD_APP_TIME,
      appTime: 50,
    });
    assert.strictEqual(state.appTime, 150);
  });
});
