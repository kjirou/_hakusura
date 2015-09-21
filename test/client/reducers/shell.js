import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import shellReducer from 'reducers/shell';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('inputBuffer, shellLines', function() {
    let state = shellReducer();
    assert.strictEqual(state.inputBuffer, '');
    assert.deepEqual(state.shellLines, ['']);

    // input a character to last
    state = shellReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'b',
    });
    state = shellReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'a',
    });
    state = shellReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'r',
    });
    assert.strictEqual(state.inputBuffer, 'bar');
    assert.deepEqual(state.shellLines, ['bar']);

    // delete a character
    state = shellReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
      position: 1,
    });
    assert.strictEqual(state.inputBuffer, 'br');
    assert.deepEqual(state.shellLines, ['br']);

    // delete last character by default
    state = shellReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
    });
    assert.strictEqual(state.inputBuffer, 'b');
    assert.deepEqual(state.shellLines, ['b']);

    // input characters
    state = shellReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'eer',
    });
    assert.strictEqual(state.inputBuffer, 'beer');
    assert.deepEqual(state.shellLines, ['beer']);

    // insert characters
    state = shellReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: ' engine',
      position: 2,
    });
    assert.strictEqual(state.inputBuffer, 'be engineer');
    assert.deepEqual(state.shellLines, ['be engineer']);

    // update all
    state = shellReducer(state, {
      type: ActionTypes.UPDATE_SHELL,
      inputBuffer: '*drunk*',
    });
    assert.strictEqual(state.inputBuffer, '*drunk*');
    assert.deepEqual(state.shellLines, ['*drunk*']);
  });
});
