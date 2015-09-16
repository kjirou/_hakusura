import Model from './Model';
import { stages } from 'models/static/stages';


export default class GameModel extends Model {

  constructor(...args) {
    super(...args);

    this._stage = undefined;
    this.clearStage();
  }

  get stage() {
    return this._stage;
  }

  selectStage(stageTypeId) {
    this._stage = stages[stageTypeId];
  }

  clearStage() {
    this._stage = null;
  }
}
