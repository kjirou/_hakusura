import assert from 'power-assert';
import sinon from 'sinon';

import AppModel from 'containers/AppModel';
import AppStore from 'containers/AppStore';
import AppInput from 'input/AppInput';
import { clearApp, heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(clearApp);

  it('should create instance', function() {
    const input = AppInput.getInstance();
    assert(input instanceof AppInput);
  });

  it('should destruct all observable sequences at clearInstance', function() {
    const input = AppInput.getInstance();
    const spies = [];
    spies.push(sinon.spy(input._timerSubscription, 'dispose'));
    spies.push(sinon.spy(input._keypressSubscription, 'dispose'));
    AppInput.clearInstance();
    assert.strictEqual(spies[0].callCount, 1);
    assert.strictEqual(spies[1].callCount, 1);
  });
});
