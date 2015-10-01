import _ from 'lodash';

import ActionTypes from 'consts/ActionTypes';
import { rotateIndex } from 'lib/util';


const createInitialState = () => {
  return {
    listPagination: null,
    rightAndLeftCommandTemplate: '',
    leftCommand: '',
    rightCommand: '',
    actionCommandTemplate: '',
    actionCommand: '',
    cursorIndex: 0,
  };
};


export var expandCommands = (listPagination, cursorIndex, templates) => {
  const {
    rightAndLeftCommandTemplate,
    actionCommandTemplate,
  } = templates;

  const commands = _.pick(createInitialState(), 'leftCommand', 'rightCommand', 'actionCommand');

  if (listPagination.pageCount === 0) {
    return commands;
  }

  commands.leftCommand = _.template(rightAndLeftCommandTemplate)({
    page: (listPagination.previousPage === null) ? listPagination.lastPage : listPagination.previousPage,
  });
  commands.rightCommand = _.template(rightAndLeftCommandTemplate)({
    page: (listPagination.nextPage === null) ? listPagination.firstPage : listPagination.nextPage,
  });
  const selectedObject = listPagination.objects[cursorIndex];
  if (selectedObject) {
    commands.actionCommand = _.template(actionCommandTemplate)(selectedObject);
  }

  return commands;
};

export default function indexWindowReducer(state = createInitialState(), action = {}) {

  switch (action.type) {

    /*
     * @param {object} listPagination - Ref) ListingMixin#getListPagination
     */
    case ActionTypes.ACTIVATE_INDEX_WINDOW:
      return (({ listPagination, rightAndLeftCommandTemplate, actionCommandTemplate }) => {
        const assignedState = _.pick(createInitialState(),
          'cursorIndex', 'leftCommand', 'rightCommand', 'actionCommand');

        if (listPagination.pageCount > 0) {
          // Keep cursor index
          let max = (listPagination.toCount - 1) % listPagination.perPage;
          assignedState.cursorIndex = Math.max(Math.min(state.cursorIndex, max), 0);

          Object.assign(
            assignedState,
            expandCommands(
              listPagination,
              assignedState.cursorIndex,
              { rightAndLeftCommandTemplate, actionCommandTemplate }
            )
          );
        }

        return Object.assign({}, state, {
          listPagination,
          rightAndLeftCommandTemplate,
          actionCommandTemplate,
        }, assignedState);
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
        const commands = expandCommands(state.listPagination, newCursorIndex, {
          rightAndLeftCommandTemplate: state.rightAndLeftCommandTemplate,
          actionCommandTemplate: state.actionCommandTemplate,
        });

        return Object.assign({}, state, {
          cursorIndex: newCursorIndex,
        }, commands);
      })(action);

    default:
      return state;
  }
}
