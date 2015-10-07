import _ from 'lodash';

import ActionTypes from 'consts/ActionTypes';


const createInitialState = () => {
  return {
  };
};


export const adventurexWindowReducer (state = createInitialState(), action = {}) => {

  switch (action.type) {

    case ActionTypes.ACTIVATE_ADVENTURE_WINDOW:
      return (() => {
        return Object.assign({}, state);
      })(action);

    case ActionTypes.INACTIVATE_ADVENTURE_WINDOW:
      return (() => {
        return createInitialState();
      })(action);

    default:
      return state;
  }
};
