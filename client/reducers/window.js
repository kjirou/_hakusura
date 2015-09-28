import ActionTypes from 'consts/ActionTypes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';
import { rotateIndex } from 'lib/util';


const initialState = {
  isOpen: false,
  isMinimized: false,
  windowContentType: null,
  // INDEX type
  listPagination: null,
  cursorIndex: 0,
};

export default function windowReducer(state = initialState, action = {}) {

  switch (action.type) {

    // Include page changing too
    case ActionTypes.ACTIVATE_INDEX_WINDOW:
      /*
       * @param {object} listPagination - Ref) ListingMixin#getListPagination
       */
      return (({ listPagination }) => {
        return Object.assign({}, state, {
          windowContentType: WINDOW_CONTENT_TYPES.INDEX,
          listPagination,
          // TODO: keep position?
          cursorIndex: 0,
        });
      })(action);

    case ActionTypes.CLOSE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isOpen: false,
        });
      })(action);

    case ActionTypes.INACTIVATE_INDEX_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          windowContentType: null,
          listPagination: null,
          cursorIndex: 0,
        });
      })(action);

    case ActionTypes.MINIMIZE_WINDOW:
      return (() => {
        return Object.assign({}, state, {
          isMinimized: true,
        });
      })(action);

    case ActionTypes.MOVE_INDEX_WINDOW_CURSOR:
      return (({ relativeIndex }) => {
        if (!state.listPagination || state.listPagination.pageCount === 0) {
          return state;
        }
        const itemCount = state.listPagination.toCount - state.listPagination.fromCount + 1;
        let newCursorIndex = Math.min(state.cursorIndex, itemCount - 1);
        newCursorIndex = rotateIndex(itemCount, newCursorIndex, relativeIndex);
        return Object.assign({}, state, {
          cursorIndex: newCursorIndex,
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
