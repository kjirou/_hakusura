import assert from 'power-assert';

import WindowHistoryListModel from 'client/models/WindowHistoryListModel';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  it('should create a instance', () => {
    let model = new WindowHistoryListModel();
  });

  it('add, pop', () => {
    let model = new WindowHistoryListModel();
    assert.deepEqual(model.getListObjects(), []);

    model.add('foo');
    assert.deepEqual(model.getListObjects(), ['foo']);
    model.add('bar');
    assert.deepEqual(model.getListObjects(), ['foo', 'bar']);

    assert.strictEqual(model.pop(), 'bar');
    assert.deepEqual(model.getListObjects(), ['foo']);
  });
});
