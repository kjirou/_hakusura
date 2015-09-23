import assert from 'power-assert';

import {
  _applyShellInputModeAliasesToInput,
  _selectShellInputMode,
} from 'actions/TerminalActionCreators';
import ShellInputModes from 'consts/ShellInputModes';
import { PLAYER_STATE_CODES } from 'models/GameModel';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('_selectShellInputMode', function() {
    assert.deepEqual(_selectShellInputMode(''), ShellInputModes.DEFAULT);
    assert.deepEqual(_selectShellInputMode(PLAYER_STATE_CODES.ADVENTURING), ShellInputModes.ADVENTURE);
    assert.deepEqual(_selectShellInputMode(PLAYER_STATE_CODES.BATTLING), ShellInputModes.BATTLE);
  });


  context('_applyShellInputModeAliasesToInput', function() {

    it('should be', function() {
      assert.strictEqual(_applyShellInputModeAliasesToInput(ShellInputModes.WIZARD, '_not_applied'), '_not_applied');
      assert.strictEqual(_applyShellInputModeAliasesToInput(ShellInputModes.WIZARD, 'adv'), '_wizard adventuring');
    });

    it('should not apply in duplication', function() {
      assert.strictEqual(_applyShellInputModeAliasesToInput('_test', 'ba'), 'ba_to_baz');
      assert.strictEqual(_applyShellInputModeAliasesToInput('_test', 'baz'), 'ba_to_bazz');
    });
  });
});
