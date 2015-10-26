import _ from 'lodash';

import ActionTypes from 'consts/ActionTypes';


export const _MAX_BOARD_DUNGEON_CARD_COUNT = 5;

export const _syncStateByNewDungeonCards = (state, newDungeonCards) => {
  const dungeonCardsOnBoard = newDungeonCards.slice(0, _MAX_BOARD_DUNGEON_CARD_COUNT);
  const remainingCardCount = newDungeonCards.length;
  return Object.assign({}, state, {
    dungeonCards: newDungeonCards,
    dungeonCardsOnBoard,
    remainingCardCount,
  });
};


const createInitialState = () => {
  return {
    dungeonCards: [],
    dungeonCardsOnBoard: [],
    remainingCardCount: 0,
  };
};


const adventureWindowReducer = (state = createInitialState(), action = {}) => {

  switch (action.type) {

    case ActionTypes.ACTIVATE_ADVENTURE_WINDOW:
      return (({ dungeonCards }) => {
        return _syncStateByNewDungeonCards(state, dungeonCards);
      })(action);

    case ActionTypes.INACTIVATE_ADVENTURE_WINDOW:
      return (() => {
        return createInitialState();
      })(action);

    default:
      return state;
  }
};

export default adventureWindowReducer;
