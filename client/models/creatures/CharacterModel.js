import NamingMixin from '../mixins/NamingMixin';
import CreatureModel from './CreatureModel';


export default class CharacterModel extends CreatureModel {

  constructor(...args) {
    super(...args);
  }
}

Object.assign(CharacterModel.prototype, NamingMixin);
