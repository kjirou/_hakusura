import _ from 'lodash';

import Model from './Model';
import ListingMixin from './mixins/ListingMixin';
import {
  COMMAND_TREE,
  MINIMIST_OPTIONS,
} from 'client/consts/CommandDefinition';
import { parse } from 'lib/command-parser';


/*
 * Is window conituning from pre-command?
 *
 * TODO: Can specify options for comparison
 */
export const _isWinodowContinuing = (command, preCommand) => {
  const a = parse(COMMAND_TREE, MINIMIST_OPTIONS, command);
  const b = parse(COMMAND_TREE, MINIMIST_OPTIONS, preCommand);
  return a.commandId === b.commandId;
};

export default class WindowHistoryListModel extends Model {

  constructor(...args) {
    super(...args);
    this._initializeListingMixin();
  }

  _add(command) {
    this._listObjects.push(command);
  }

  stack(command) {
    const preCommand = this._listObjects[this._listObjects.length - 1] || null;
    if (preCommand === null || !_isWinodowContinuing(command, preCommand)) {
      this._add(command);
    }
  }

  pop() {
    return this._listObjects.pop();
  }
}

Object.assign(WindowHistoryListModel.prototype, ListingMixin);
