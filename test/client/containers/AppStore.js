import assert from 'power-assert';

import AppStore from 'containers/AppStore';
import { clearApp, heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  before(clearApp);

  it('should be', function() {
    const { store, dispatchers } = new AppStore();
    assert.strictEqual(store.getState().shell.inputBuffer, '');
    dispatchers.shell.inputToShell('a');
    assert.strictEqual(store.getState().shell.inputBuffer, 'a');
  });
});
