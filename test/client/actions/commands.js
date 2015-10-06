import assert from 'power-assert';

import {
  _selectShellInputMode,
} from 'actions/commands';
import ShellInputModes from 'consts/ShellInputModes';
import { PLAYER_STATE_CODES } from 'models/GameModel';

import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('_selectShellInputMode', function() {
    assert.deepEqual(_selectShellInputMode(''), ShellInputModes.DEFAULT);
    assert.deepEqual(_selectShellInputMode(PLAYER_STATE_CODES.ADVENTURING), ShellInputModes.ADVENTURE);
    assert.deepEqual(_selectShellInputMode(PLAYER_STATE_CODES.BATTLING), ShellInputModes.BATTLE);
  });
});
