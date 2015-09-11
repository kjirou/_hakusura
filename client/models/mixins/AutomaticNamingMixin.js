import _s from 'underscore.string';

import NamingMixin from './NamingMixin';


const AutomaticNamingMixin = Object.assign({}, NamingMixin, {
  getName() {
    if (this._name) {
      return this._name;
    }
    if (this.constructor && this.constructor.typeId) {
      return _s.titleize(_s.humanize(this.constructor.typeId));
    }
    return null;
  }
});

export default AutomaticNamingMixin;
