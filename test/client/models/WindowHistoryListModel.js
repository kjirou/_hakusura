import assert from 'power-assert';

import WindowHistoryListModel, {
  _isWinodowContinuing,
} from 'client/models/WindowHistoryListModel';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  it('should create a instance', () => {
    let model = new WindowHistoryListModel();
  });

  it('_add, pop', () => {
    let model = new WindowHistoryListModel();
    assert.deepEqual(model.getListObjects(), []);

    model._add('foo');
    assert.deepEqual(model.getListObjects(), ['foo']);
    model._add('bar');
    assert.deepEqual(model.getListObjects(), ['foo', 'bar']);

    assert.strictEqual(model.pop(), 'bar');
    assert.deepEqual(model.getListObjects(), ['foo']);
  });

  it('_isWinodowContinuing', () => {
    assert(_isWinodowContinuing('character index', 'character index'));
    assert(_isWinodowContinuing('character index', 'character'));
    assert(_isWinodowContinuing(' character index', 'character   index -a -b -c'));
    assert(!_isWinodowContinuing('character index', 'character list'));
    assert(!_isWinodowContinuing('character index', 'help'));
  });

  it('stack', () => {
    let model = new WindowHistoryListModel();

    model.stack('character index');
    assert.deepEqual(model.getListObjects(), ['character index']);
    model.stack('character index');
    assert.deepEqual(model.getListObjects(), ['character index']);
    model.stack('character list');
    assert.deepEqual(model.getListObjects(), [
      'character index',
      'character list',
    ]);
    model.stack('character list');
    model.stack('character index');
    assert.deepEqual(model.getListObjects(), [
      'character index',
      'character list',
      'character index',
    ]);
  });
});
