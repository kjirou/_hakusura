import assert from 'power-assert';

import AppStore from 'containers/AppStore';
import {clearApp, heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  before(clearApp);

  it('should be');
  //it('should be', function() {
  //  const {store, dispatchers} = new AppStore();
  //  assert.strictEqual(store.getState().screen.activePageId, 'welcome');
  //  dispatchers.changePage('game');
  //  assert.strictEqual(store.getState().screen.activePageId, 'game');
  //});
});
