import assert from 'power-assert';

import AppModel from 'containers/AppModel';
import { clearApp, heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(clearApp);

  it('should be', function() {
    const model = AppModel.getInstance();
  });
});
