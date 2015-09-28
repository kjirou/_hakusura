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

  it('ACTIVATE_INDEX_WINDOW, INACTIVATE_INDEX_WINDOW', function() {
    let state = windowReducer();
    assert.strictEqual(state.windowContentType, null);
    assert.deepEqual(state.listPagination, null);

    state = windowReducer(state, {
      type: ActionTypes.ACTIVATE_INDEX_WINDOW,
      listPagination: {},
    });
    assert.strictEqual(state.windowContentType, WINDOW_CONTENT_TYPES.INDEX);
    assert.deepEqual(state.listPagination, {});

    state = windowReducer(state, {
      type: ActionTypes.INACTIVATE_INDEX_WINDOW,
    });
    assert.strictEqual(state.windowContentType, null);
    assert.deepEqual(state.listPagination, null);
  });


  context('MOVE_INDEX_WINDOW_CURSOR', function() {

    it('should be', function() {
      let state = windowReducer();
      assert.deepEqual(state.cursorIndex, 0);

      state = windowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 2,
          perPage: 10,
          fromCount: 11,
          toCount: 20,
        },
      });
      assert.strictEqual(state.windowContentType, WINDOW_CONTENT_TYPES.INDEX);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 1);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 8,
      });
      assert.deepEqual(state.cursorIndex, 9);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: -1,
      });
      assert.deepEqual(state.cursorIndex, 9);
    });

    it('short rotation', function() {
      let state = windowReducer();
      state = windowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 2,
          perPage: 10,
          fromCount: 11,
          toCount: 17,
        },
      });

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 6,
      });
      assert.deepEqual(state.cursorIndex, 6);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: -1,
      });
      assert.deepEqual(state.cursorIndex, 6);
    });

    it('ignored cases', function() {
      let state;

      // listPagination is not set
      state = windowReducer();
      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      // pageCount is 0
      state = windowReducer();
      state = windowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 0,
        },
      });
      state = windowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);
    });
  });
});
