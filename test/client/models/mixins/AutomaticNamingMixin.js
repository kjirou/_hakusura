import assert from 'assert'

import AutomaticNamingMixin from 'models/mixins/AutomaticNamingMixin';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should return titleized typeId as name', function() {
    class Foo {
    }
    Object.assign(Foo.prototype, AutomaticNamingMixin);
    const foo = new Foo();
    assert.strictEqual(foo.getName(), null);
    Foo.typeId = 'my_name-is taro';
    assert.strictEqual(foo.getName(), 'My Name Is Taro');
    foo._name = 'Jiro';
    assert.strictEqual(foo.getName(), 'Jiro');
  });
});
