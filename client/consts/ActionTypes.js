import keymirror from 'keymirror';


const ActionTypes = keymirror({
  APPLY_COMMAND_EXECUTION: null,
  CLOSE_WINDOW: null,
  DELETE_CHARACTER_FROM_SHELL: null,
  EXECUTE_SHELL: null,
  FORWARD_APP_TIME: null,
  INPUT_TO_SHELL: null,
  MOVE_CURSOR: null,
  MINIMIZE_WINDOW: null,
  OPEN_WINDOW: null,
  UNMINIMIZE_WINDOW: null,
  UPDATE_SHELL: null,
});

export default ActionTypes;
