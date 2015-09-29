import _ from 'lodash';

import ActionTypes from 'consts/ActionTypes';
import { rotateIndex } from 'lib/util';


const createInitialState = () => {
  return {
    listPagination: null,
    rightAndLeftCommandTemplate: '',
    leftCommand: '',
    rightCommand: '',
    spaceCommandTemplate: '',
    spaceCommand: '',
    cursorIndex: 0,
  };
};


export var expandCommands = (listPagination, cursorIndex, templates) => {
  const {
    rightAndLeftCommandTemplate,
    spaceCommandTemplate,
  } = templates;

  const commands = _.pick(createInitialState(), 'leftCommand', 'rightCommand', 'spaceCommand');

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
    commands.spaceCommand = _.template(spaceCommandTemplate)(selectedObject);
  }

  return commands;
};

export default function indexWindowReducer(state = createInitialState(), action = {}) {

  switch (action.type) {

    /*
     * @param {object} listPagination - Ref) ListingMixin#getListPagination
     */
    case ActionTypes.ACTIVATE_INDEX_WINDOW:
      return (({ listPagination, rightAndLeftCommandTemplate, spaceCommandTemplate }) => {
        const assignedState = _.pick(createInitialState(),
          'cursorIndex', 'leftCommand', 'rightCommand', 'spaceCommand');

        if (listPagination.pageCount > 0) {
          // Keep cursor index
          let max = (listPagination.toCount - 1) % listPagination.perPage;
          assignedState.cursorIndex = Math.max(Math.min(state.cursorIndex, max), 0);

          Object.assign(
            assignedState,
            expandCommands(
              listPagination,
              assignedState.cursorIndex,
              { rightAndLeftCommandTemplate, spaceCommandTemplate }
            )
          );
        }

        return Object.assign({}, state, {
          listPagination,
          rightAndLeftCommandTemplate,
          spaceCommandTemplate,
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
          spaceCommandTemplate: state.spaceCommandTemplate,
        });

        return Object.assign({}, state, {
          cursorIndex: newCursorIndex,
        }, commands);
      })(action);

    default:
      return state;
  }
}
