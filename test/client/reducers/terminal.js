import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import terminalReducer from 'reducers/terminal';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('inputBuffer, shellLines', function() {
    let state = terminalReducer();
    assert.strictEqual(state.inputBuffer, '');
    assert.deepEqual(state.shellLines, ['']);

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
    assert.deepEqual(state.shellLines, ['bar']);

    // delete a character
    state = terminalReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
      position: 1,
    });
    assert.strictEqual(state.inputBuffer, 'br');
    assert.deepEqual(state.shellLines, ['br']);

    // delete last character by default
    state = terminalReducer(state, {
      type: ActionTypes.DELETE_CHARACTER_FROM_SHELL,
    });
    assert.strictEqual(state.inputBuffer, 'b');
    assert.deepEqual(state.shellLines, ['b']);

    // input characters
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: 'eer',
    });
    assert.strictEqual(state.inputBuffer, 'beer');
    assert.deepEqual(state.shellLines, ['beer']);

    // insert characters
    state = terminalReducer(state, {
      type: ActionTypes.INPUT_TO_SHELL,
      input: ' engine',
      position: 2,
    });
    assert.strictEqual(state.inputBuffer, 'be engineer');
    assert.deepEqual(state.shellLines, ['be engineer']);

    // update all
    state = terminalReducer(state, {
      type: ActionTypes.UPDATE_SHELL,
      inputBuffer: '*drunk*',
    });
    assert.strictEqual(state.inputBuffer, '*drunk*');
    assert.deepEqual(state.shellLines, ['*drunk*']);
  });

  it('APPLY_COMMAND_EXECUTION', function() {
    let state = terminalReducer();
    assert.strictEqual(state.inputBuffer, '');
    assert.deepEqual(state.outputLines, []);

    state = terminalReducer(state, {
      type: ActionTypes.APPLY_COMMAND_EXECUTION,
      input: 'help config',
      output: 'config is ..',
    });
    assert.strictEqual(state.inputBuffer, '');
    assert.deepEqual(state.outputLines, [
      'config is ..',
      '> help config',
    ]);
  });
});