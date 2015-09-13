import ActionTypes from 'consts/ActionTypes';


const initialState = {
  activePageId: 'welcome'
};

export default function screen(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.CHANGE_PAGE:
      return Object.assign({}, state, {
        activePageId: action.activePageId,
      });

    case ActionTypes.START_GAME:
      return Object.assign({}, state, {
        activePageId: 'game',
      });

    default:
      return state;
  }
}
