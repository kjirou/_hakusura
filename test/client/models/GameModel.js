import assert from 'power-assert';

import GameModel, {
  PLAYER_STATE_CODES,
} from 'client/models/GameModel';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  it('should be', () => {
    const model = new GameModel();
  });

  it('getPlayerStateCode', () => {
    const model = new GameModel();
    assert.strictEqual(model.getPlayerStateCode(), PLAYER_STATE_CODES.WAITING);
    model.prepareAdventurer();
    assert.strictEqual(model.getPlayerStateCode(), PLAYER_STATE_CODES.IN_PREPARATION);
    model.prepareAdventure();
    assert.strictEqual(model.getPlayerStateCode(), PLAYER_STATE_CODES.ADVENTURING);
  });
});
