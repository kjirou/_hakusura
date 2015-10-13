import _ from 'lodash';

import ActionTypes from 'consts/ActionTypes';


const syncStateByNewDungeonCards = (state, newDungeonCards) => {
  const dungeonCardsOnBoard = newDungeonCards.slice(0, 5);
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


const adventurexWindowReducer = (state = createInitialState(), action = {}) => {

  switch (action.type) {

    case ActionTypes.ACTIVATE_ADVENTURE_WINDOW:
      return (({ dungeonCards }) => {
        return syncStateByNewDungeonCards(state, dungeonCards);
      })(action);

    case ActionTypes.INACTIVATE_ADVENTURE_WINDOW:
      return (() => {
        return createInitialState();
      })(action);

    default:
      return state;
  }
};

export default adventurexWindowReducer;
