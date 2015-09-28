import assert from 'power-assert';

import ListingMixinCreator from 'models/mixins/ListingMixinCreator';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be able to extend a object', function() {
    const foo = {};
    Object.assign(foo, ListingMixinCreator());
    assert(Array.isArray(foo._listObjects));
    assert.strictEqual(typeof foo.getListObjects, 'function');
  });

  it('getListObjects', function() {
    const foo = Object.assign({}, ListingMixinCreator());
    foo._listObjects = [
      { name: 'Taro' },
      { name: 'Jiro' },
    ];
    assert.deepEqual(foo.getListObjects(), [
      { name: 'Taro' },
      { name: 'Jiro' },
    ]);
  });

  it('getListPagination', function() {
    const foo = Object.assign({}, ListingMixinCreator());
    foo._listObjects = [
      { name: 'Taro' },
      { name: 'Jiro' },
      { name: 'Saburo' },
      { name: 'Shiro' },
      { name: 'Goro' },
    ];
    let pagination;

    pagination = foo.getListPagination(2, 2);

    // npm pagination's results
    assert.strictEqual(pagination.pageCount, 3);
    assert.strictEqual(pagination.currentPage, 2);
    assert.strictEqual(pagination.previousPage, 1);
    assert.strictEqual(pagination.nextPage, 3);
    assert.strictEqual(pagination.fromCount, 3);

    // extended results
    assert.deepEqual(pagination.objects, [
      { name: 'Saburo' },
      { name: 'Shiro' },
    ]);
    assert.deepEqual(pagination.indexedObjects, [
      {
        index: 2,
        serialNumber: 3,
        object: { name: 'Saburo' },
      },
      {
        index: 3,
        serialNumber: 4,
        object: { name: 'Shiro' },
      },
    ]);

    // the number of objects is less than the max page objects
    pagination = foo.getListPagination(3, 2);
    assert.strictEqual(pagination.pageCount, 2);
    assert.strictEqual(pagination.currentPage, 2);
    assert.strictEqual(pagination.previousPage, 1);
    assert.strictEqual(pagination.nextPage, null);
    assert.strictEqual(pagination.fromCount, 4);
    assert.deepEqual(pagination.objects, [
      { name: 'Shiro' },
      { name: 'Goro' },
    ]);
    assert.deepEqual(pagination.indexedObjects, [
      {
        index: 3,
        serialNumber: 4,
        object: { name: 'Shiro' },
      },
      {
        index: 4,
        serialNumber: 5,
        object: { name: 'Goro' },
      },
    ]);

    // the current page number is out of range
    pagination = foo.getListPagination(1, 99);
    assert.strictEqual(pagination.pageCount, 5);
    assert.strictEqual(pagination.currentPage, 5);
    assert.strictEqual(pagination.previousPage, 4);  // Notice: pageCount - 1
    assert.strictEqual(pagination.nextPage, null);
  });
});
