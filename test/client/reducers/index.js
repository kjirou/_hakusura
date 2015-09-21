import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import reducer from 'reducers';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  context('screen', function() {

    it('should be', function() {
      let state;
      state = reducer();
      assert.strictEqual(state.screen.activePageId, 'welcome');
      state = reducer({}, { type: ActionTypes.CHANGE_PAGE, activePageId: 'game' });
      assert.strictEqual(state.screen.activePageId, 'game');
    });
  });
});
