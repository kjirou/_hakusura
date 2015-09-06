import assert from 'power-assert';

import SingletonMixin from 'lib/SingletonMixin';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('getInstance, clearInstance', function() {
    class Foo {
      constructor(x, y) {
        this.data = {
          x: x,
          y: y
        };
      }
    }
    Object.assign(Foo, SingletonMixin);

    let foo = Foo.getInstance(1, 2);
    assert.deepEqual(foo.data, { x: 1, y: 2 });
    let foo2 = Foo.getInstance();
    assert(foo === foo2);

    Foo.clearInstance();
    let foo3 = Foo.getInstance(2, 3);
    assert(foo !== foo3);
    assert.deepEqual(foo3.data, { x: 2, y: 3 });
  });
});
