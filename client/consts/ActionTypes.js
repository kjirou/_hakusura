import keymirror from 'keymirror';


const ActionTypes = keymirror({
  APPLY_COMMAND_EXECUTION: null,
  DELETE_CHARACTER_FROM_SHELL: null,
  EXECUTE_SHELL: null,
  FORWARD_APP_TIME: null,
  INPUT_TO_SHELL: null,
  MOVE_CURSOR: null,
  UPDATE_SHELL: null,
});

export default ActionTypes;
