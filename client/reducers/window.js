import ActionTypes from 'consts/ActionTypes';


const initialState = {
  isOpen: false,
  isMinimized: false,
};

export default function windowReducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.CLOSE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isOpen: false,
        });
      })(action);

    case ActionTypes.MINIMIZE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isMinimized: true,
        });
      })(action);

    case ActionTypes.UNMINIMIZE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isMinimized: false,
        });
      })(action);

    case ActionTypes.OPEN_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isOpen: true,
        });
      })(action);

    default:
      return state;
  }
}
