import assert from 'power-assert';

import AppModel from 'containers/AppModel';
import AppStore from 'containers/AppStore';
import { onKeypress } from 'input/subscriptions/keypress';
import { clearApp, heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(clearApp);

  //it('should create instance', function() {
  //  const { store } = AppStore.getInstance();
  //  const { game } = AppModel.getInstance();

  //  assert.strictEqual(store.getState().screen.activePageId, 'welcome');
  //  assert.strictEqual(game.stage, null);
  //  onKeypress({ name: '1', sequence: '1', ctrl: false });
  //  assert.strictEqual(store.getState().screen.activePageId, 'game');
  //  assert.strictEqual(typeof game.stage, 'object');
  //});
});
