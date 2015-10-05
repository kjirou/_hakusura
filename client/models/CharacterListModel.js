import _ from 'lodash';
import randomName from 'node-random-name';

import Model from './Model';
import CharacterModel from './creatures/CharacterModel';
import ListingMixin from './mixins/ListingMixin';


export default class CharacterListModel extends Model {

  constructor(...args) {
    super(...args);
    this._initializeListingMixin();

    // TMP:
    _.range(35).forEach(() => {
      const character = new CharacterModel();
      character._name = randomName({
        seed: String(Math.random()),
        first: true,
      });
      this._listObjects.push(character)
    });
  }
}

Object.assign(CharacterListModel.prototype, ListingMixin);
