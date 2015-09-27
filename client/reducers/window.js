import ActionTypes from 'consts/ActionTypes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';


const initialState = {
  isOpen: false,
  isMinimized: false,
  windowContentType: null,
  // INDEX type
  listPagination: [],
  cursorIndex: 0,
};

export default function windowReducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.ACTIVATE_INDEX_WINDOW:
      return (({ listPagination }) => {
        return Object.assign({}, state, {
          windowContentType: WINDOW_CONTENT_TYPES.INDEX,
          listPagination,
        });
      })(action);

    case ActionTypes.CLOSE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isOpen: false,
        });
      })(action);

    case ActionTypes.INACTIVATE_INDEX_WINDOW:
      return (({ listPagination }) => {
        return Object.assign({}, state, {
          windowContentType: null,
          listPagination: [],
          cursorIndex: 0,
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
