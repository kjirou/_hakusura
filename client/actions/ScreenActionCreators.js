import ActionTypes from 'consts/ActionTypes';
import AppModel from 'containers/AppModel';


const ScreenActionCreators = {

  changePage(activePageId) {
    return {
      type: ActionTypes.CHANGE_PAGE,
      activePageId,
    };
  },

  startGame(stageTypeId) {
    const { game } = AppModel.getInstance();
    game.selectStage(stageTypeId);
    return {
      type: ActionTypes.START_GAME,
      stageTypeId,
    };
  },
};

export default ScreenActionCreators;
