import Model from './Model';
import ListingMixinCreator from './mixins/ListingMixinCreator';


export default class CharacterListModel extends Model {

  constructor(...args) {
    super(...args);
  }
}

Object.assign(CharacterListModel.prototype, ListingMixinCreator());
