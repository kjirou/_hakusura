import keymirror from 'keymirror';


const ActionTypes = keymirror({
  ACTIVATE_INDEX_WINDOW: null,
  APPLY_COMMAND_EXECUTION: null,
  CLOSE_WINDOW: null,
  DELETE_CHARACTER_FROM_SHELL: null,
  EXECUTE_SHELL: null,
  FORWARD_APP_TIME: null,
  GET_STATE: null,
  INACTIVATE_INDEX_WINDOW: null,
  INPUT_TO_SHELL: null,
  MOVE_CURSOR: null,
  MINIMIZE_WINDOW: null,
  OPEN_WINDOW: null,
  SET_STATE: null,
  UNMINIMIZE_WINDOW: null,
  UPDATE_SHELL: null,
});

export default ActionTypes;
