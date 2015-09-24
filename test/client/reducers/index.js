import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import ShellInputModes from 'consts/ShellInputModes';
import rootReducer from 'reducers';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  context('screen', function() {

    it('should be', function() {
      let state;
      state = rootReducer();
      assert.strictEqual(state.terminal.inputBuffer, '');
      state = rootReducer(state, {
        type: ActionTypes.INPUT_TO_SHELL,
        input: 'a',
      });
      assert.strictEqual(state.terminal.inputBuffer, 'a');
    });


    context('APPLY_COMMAND_EXECUTION_BY_WIZARD', function() {

      it('getstate', function() {
        let state;
        state = rootReducer();
        assert.deepEqual(state.terminal.outputLines, []);

        // success
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'getstate',
          dataPath: 'terminal.shellInputMode',
        });
        assert.deepEqual(state.terminal.outputLines, [
          ShellInputModes.DEFAULT,
        ]);

        // not found
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'getstate',
          dataPath: 'not.exists',
        });
        assert.strictEqual(state.terminal.outputLines[1], ShellInputModes.DEFAULT);
        assert(/not\.exists/.test(state.terminal.outputLines[0]));
      });

      it('input passing', function() {
        let state;
        state = rootReducer();
        assert.deepEqual(state.terminal.outputLines, []);

        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'getstate',
          dataPath: '',
          input: 'this_is_a_input',
        });
        assert(/this_is_a_input/.test(state.terminal.outputLines[1]));
      });

      it('setstate', function() {
        let state;
        state = rootReducer();

        // set a number
        assert.strictEqual(state.time.appTime, 0);
        assert.deepEqual(state.terminal.outputLines, []);
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'setstate',
          dataPath: 'time.appTime',
          json: '100',
        });
        assert.strictEqual(state.time.appTime, 100);
        assert.deepEqual(state.terminal.outputLines, []);

        // set a string
        assert.strictEqual(state.terminal.shellInputMode, ShellInputModes.DEFAULT);
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'setstate',
          dataPath: 'terminal.shellInputMode',
          json: '"foo"',
        });
        assert.strictEqual(state.terminal.shellInputMode, "foo");

        // invalid dataPath
        assert.deepEqual(state.terminal.outputLines, []);
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'setstate',
          dataPath: 'not.exists',
          json: '1',
        });
        assert.deepEqual(state.terminal.outputLines, []);

        // invalid as a json string
        assert.deepEqual(state.terminal.outputLines, []);
        state = rootReducer(state, {
          type: ActionTypes.APPLY_COMMAND_EXECUTION_BY_WIZARD,
          mode: 'setstate',
          dataPath: 'time.appTime',
          json: 'i',
        });
        assert(/Unexpected token/.test(state.terminal.outputLines[0]));
      });
    });
  });
});
