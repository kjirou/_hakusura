import keymirror from 'keymirror';


const ActionTypes = keymirror({
  CHANGE_PAGE: null,
  DELETE_CHARACTER_FROM_SHELL: null,
  EXECUTE_SHELL: null,
  INPUT_TO_SHELL: null,
  FORWARD_APP_TIME: null,
  START_GAME: null,
  UPDATE_SHELL: null,
});

export default ActionTypes;
