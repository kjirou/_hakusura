import assert from 'power-assert';

import {
  _applyShellInputModeAliasesToInput,
} from 'actions/TerminalActionCreators';
import ShellInputModes from 'consts/ShellInputModes';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {


  context('_applyShellInputModeAliasesToInput', function() {

    it('should not apply in duplication', function() {
      const aliases = [
        [/ba/, 'ba_to_baz'],
        [/baz/, ''],
      ];
      assert.strictEqual(_applyShellInputModeAliasesToInput(aliases, 'ba'), 'ba_to_baz');
      assert.strictEqual(_applyShellInputModeAliasesToInput(aliases, 'baz'), 'ba_to_bazz');
    });
  });
});
