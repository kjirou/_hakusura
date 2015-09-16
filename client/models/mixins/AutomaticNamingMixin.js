import _s from 'underscore.string';

import NamingMixin from './NamingMixin';


const AutomaticNamingMixin = Object.assign({}, NamingMixin, {
  getName() {
    if (this._name) {
      return this._name;
    }
    let typeId = this.typeId || (this.constructor || {}).typeId || null;
    if (typeId) {
      return _s.titleize(_s.humanize(typeId));
    }
    return null;
  }
});

export default AutomaticNamingMixin;
