import _ from 'lodash';

import Model from './Model';
import ListingMixinCreator from './mixins/ListingMixinCreator';


export default class WindowHistoryListModel extends Model {

  add(command) {
    this._listObjects.push(command);
  }

  pop() {
    return this._listObjects.pop();
  }
}

Object.assign(WindowHistoryListModel.prototype, ListingMixinCreator());
