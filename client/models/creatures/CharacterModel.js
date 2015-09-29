import NamingMixin from '../mixins/NamingMixin';
import CreatureModel from './CreatureModel';


export default class CharacterModel extends CreatureModel {

  constructor(...args) {
    super(...args);
  }

  toBlessedContent() {
    return [
      this.getName(),
      'Fig/Hum',
      'Lv:99',
      'Hp:999',
    ].join(', ');
  }
}

Object.assign(CharacterModel.prototype, NamingMixin);
