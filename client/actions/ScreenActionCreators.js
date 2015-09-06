import ActionTypes from 'consts/ActionTypes';


const ScreenActionCreators = {

  changePage(activePageId) {
    return {
      type: ActionTypes.CHANGE_PAGE,
      activePageId
    };
  }
};

export default ScreenActionCreators;
