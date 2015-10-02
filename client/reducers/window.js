import ActionTypes from 'consts/ActionTypes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';


const initialState = {
  isOpen: false,
  isMinimized: false,
  windowContentType: null,
};

export default function windowReducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.CLOSE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isOpen: false,
          windowContentType: null,
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
      return (({ windowContentType }) => {
        return Object.assign({}, state, {
          isOpen: true,
          windowContentType,
        });
      })(action);

    case ActionTypes.TOGGLE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isMinimized: !state.isMinimized,
        });
      })(action);

    default:
      return state;
  }
}
