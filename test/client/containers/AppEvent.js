import {EventEmitter} from 'events';
import assert from 'power-assert';

import AppEvent from 'containers/AppEvent';
import {clearApp, heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(clearApp);

  it('should be', function() {
    const event = AppEvent.getInstance();
    assert(event.emitter instanceof EventEmitter);
  });
});
