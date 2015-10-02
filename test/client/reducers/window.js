import _ from 'lodash';
import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import { WINDOW_CONTENT_TYPES } from 'consts/ViewProps';
import windowReducer from 'reducers/window';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('OPEN_WINDOW, CLOSE_WINDOW', function() {
    let state = windowReducer();
    assert.strictEqual(state.isOpen, false);
    assert.strictEqual(state.windowContentType, null);

    state = windowReducer(state, {
      type: ActionTypes.OPEN_WINDOW,
      windowContentType: WINDOW_CONTENT_TYPES.INDEX,
    });
    assert.strictEqual(state.isOpen, true);
    assert.strictEqual(state.windowContentType, WINDOW_CONTENT_TYPES.INDEX);

    state = windowReducer(state, {
      type: ActionTypes.CLOSE_WINDOW,
    });
    assert.strictEqual(state.isOpen, false);
    assert.strictEqual(state.windowContentType, null);
  });

  it('MINIMIZE_WINDOW, UNMINIMIZE_WINDOW, TOGGLE_WINDOW', function() {
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

    state = windowReducer(state, {
      type: ActionTypes.TOGGLE_WINDOW,
    });
    assert.strictEqual(state.isMinimized, true);

    state = windowReducer(state, {
      type: ActionTypes.TOGGLE_WINDOW,
    });
    assert.strictEqual(state.isMinimized, false);
  });
});
