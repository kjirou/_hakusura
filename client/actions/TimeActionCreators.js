import ActionTypes from 'consts/ActionTypes';
import AppModel from 'containers/AppModel';


const TimeActionCreators = {

  forwardAppTime(appTime) {
    return {
      type: ActionTypes.FORWARD_APP_TIME,
      appTime,
    };
  },
};

export default TimeActionCreators;
