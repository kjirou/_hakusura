import assert from 'power-assert';

import adventureWindowReducer, {
  _MAX_BOARD_DUNGEON_CARD_COUNT,
  _syncStateByNewDungeonCards,
} from 'client/reducers/adventure-window';
import ActionTypes from 'consts/ActionTypes';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  it('should be', () => {
    const state = adventureWindowReducer();
  });

  it('_syncStateByNewDungeonCards', () => {
    let state = adventureWindowReducer();
    state = _syncStateByNewDungeonCards(state, []);
    assert.strictEqual(state.dungeonCards.length, 0);
    assert.deepEqual(state.dungeonCardsOnBoard, []);
    assert.strictEqual(state.remainingCardCount, 0);

    state = _syncStateByNewDungeonCards(state, [1, 2, 3, 4, 5, 6]);  // TODO: Invalid objects
    assert.strictEqual(state.dungeonCards.length, 6);
    assert.strictEqual(state.dungeonCardsOnBoard.length, _MAX_BOARD_DUNGEON_CARD_COUNT);
    assert.deepEqual(state.dungeonCardsOnBoard, [1, 2, 3, 4, 5]);
    assert.strictEqual(state.remainingCardCount, 6);
  });
});
