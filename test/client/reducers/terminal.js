import assert from 'power-assert';
import _s from 'underscore.string';

import ActionTypes from 'consts/ActionTypes';
import { SCREEN_WIDTH } from 'consts/ViewProps';
import terminalReducer from 'reducers/terminal';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('inputBuffer', function() {
    let state = terminalReducer();
    assert.strictEqual(state.inputBuffer, '');

    // input a character to last
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'b',
    });
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'a',
    });
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'r',
    });
    assert.strictEqual(state.inputBuffer, 'bar');

    // delete a character
    state = terminalReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
      position: 1,
    });
    assert.strictEqual(state.inputBuffer, 'br');

    // delete last character by default
    state = terminalReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
    });
    assert.strictEqual(state.inputBuffer, 'b');

    // input characters
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'eer',
    });
    assert.strictEqual(state.inputBuffer, 'beer');

    // insert characters
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: ' engine',
      position: 2,
    });
    assert.strictEqual(state.inputBuffer, 'be engineer');

    // update all
    state = terminalReducer(state, {
      type: ActionTypes.UPDATE_SHELL,
      inputBuffer: '*drunk*',
    });
    assert.strictEqual(state.inputBuffer, '*drunk*');
  });

  it('MOVE_CURSOR', function() {
    let state = terminalReducer();
    assert.strictEqual(state.cursorPosition, 0);

    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: _s.repeat('a', 10),
    });

    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      position: 1,
    });
    assert.strictEqual(state.cursorPosition, 1);

    // min check
    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      position: -1,
    });
    assert.strictEqual(state.cursorPosition, 0);

    // max check
    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      position: 99999999,
    });
    assert.strictEqual(state.cursorPosition, 10);

    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      position: 0,
    });
    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      relativePosition: 2,
    });
    assert.strictEqual(state.cursorPosition, 2);

    state = terminalReducer(state, {
      type: ActionTypes.MOVE_CURSOR,
      relativePosition: -1,
    });
    assert.strictEqual(state.cursorPosition, 1);
  });
});
