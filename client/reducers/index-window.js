import ActionTypes from 'consts/ActionTypes';
import { rotateIndex } from 'lib/util';


const createInitialState = () => {
  return {
    listPagination: null,
    cursorIndex: 0,
  };
};

export default function indexWindowReducer(state = createInitialState(), action = {}) {

  switch (action.type) {

    /*
     * @param {object} listPagination - Ref) ListingMixin#getListPagination
     */
    case ActionTypes.ACTIVATE_INDEX_WINDOW:
      return (({ listPagination }) => {
        let newCursorIndex = 0;
        // Keep cursor index
        if (listPagination.pageCount > 0) {
          const max = (listPagination.toCount - 1) % listPagination.perPage;
          newCursorIndex = Math.max(Math.min(state.cursorIndex, max), 0);
        }
        return Object.assign({}, state, {
          listPagination,
          cursorIndex: newCursorIndex,
        });
      })(action);

    case ActionTypes.INACTIVATE_INDEX_WINDOW:
      return (() => {
        return createInitialState();
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

    default:
      return state;
  }
}
