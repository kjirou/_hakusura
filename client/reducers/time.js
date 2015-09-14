import ActionTypes from 'consts/ActionTypes';


const initialState = {
  /* Expected execution time after that application has started */
  appTime: 0,
};

export default function timeReducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.FORWARD_APP_TIME:
      return Object.assign({}, state, {
        appTime: state.appTime + action.appTime,
      });

    default:
      return state;
  }
}
