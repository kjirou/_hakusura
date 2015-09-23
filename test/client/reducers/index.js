import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import reducer from 'reducers';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  context('screen', function() {

    it('should be', function() {
      let state;
      state = reducer();
      assert.strictEqual(state.terminal.inputBuffer, '');
      state = reducer(state, {
        type: ActionTypes.INPUT_TO_SHELL,
        input: 'a',
      });
      assert.strictEqual(state.terminal.inputBuffer, 'a');
    });
  });
});
