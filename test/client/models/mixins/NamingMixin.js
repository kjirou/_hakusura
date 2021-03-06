import assert from 'power-assert'

import Model from 'models/Model';
import NamingMixin from 'models/mixins/NamingMixin'
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should apply to object', function() {
    const foo = {};
    Object.assign(foo, NamingMixin, {
      _name: 'foo',
      _shortName: 'fo',
      _abbreviation: 'f'
    });

    assert.strictEqual(foo.getName(), 'foo');
    assert.strictEqual(foo.getShortName(), 'fo');
    assert.strictEqual(foo.getAbbreviation(), 'f');

    foo._abbreviation = null;
    assert.strictEqual(foo.getAbbreviation(), 'fo');

    foo._shortName = null;
    assert.strictEqual(foo.getShortName(), 'foo');
    assert.strictEqual(foo.getAbbreviation(), 'foo');
  });
});
