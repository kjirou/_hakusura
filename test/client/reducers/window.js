import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import windowReducer from 'reducers/window';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('OPEN_WINDOW, CLOSE_WINDOW', function() {
    let state = windowReducer();
    assert.strictEqual(state.isOpen, false);

    state = windowReducer(state, {
      type: ActionTypes.OPEN_WINDOW,
    });
    assert.strictEqual(state.isOpen, true);

    state = windowReducer(state, {
      type: ActionTypes.CLOSE_WINDOW,
    });
    assert.strictEqual(state.isOpen, false);
  });

  it('MINIMIZE_WINDOW, UNMINIMIZE_WINDOW', function() {
    let state = windowReducer();
    assert.strictEqual(state.isMinimized, false);

    state = windowReducer(state, {
      type: ActionTypes.MINIMIZE_WINDOW,
    });
    assert.strictEqual(state.isMinimized, true);

    state = windowReducer(state, {
      type: ActionTypes.UNMINIMIZE_WINDOW,
    });
    assert.strictEqual(state.isMinimized, false);
  });
});
