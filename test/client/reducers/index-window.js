import _ from 'lodash';
import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import indexWindowReducer from 'reducers/index-window';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('ACTIVATE_INDEX_WINDOW, INACTIVATE_INDEX_WINDOW', function() {
    let state = indexWindowReducer();
    assert.deepEqual(state.listPagination, null);

    state = indexWindowReducer(state, {
      type: ActionTypes.ACTIVATE_INDEX_WINDOW,
      listPagination: {},
    });
    assert.deepEqual(state.listPagination, {});

    state = indexWindowReducer(state, {
      type: ActionTypes.INACTIVATE_INDEX_WINDOW,
    });
    assert.deepEqual(state.listPagination, null);
  });


  context('MOVE_INDEX_WINDOW_CURSOR', function() {

    it('should be', function() {
      let state = indexWindowReducer();
      assert.deepEqual(state.cursorIndex, 0);

      state = indexWindowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 2,
          perPage: 10,
          fromCount: 11,
          toCount: 20,
        },
      });

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 1);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 8,
      });
      assert.deepEqual(state.cursorIndex, 9);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: -1,
      });
      assert.deepEqual(state.cursorIndex, 9);
    });

    it('short rotation', function() {
      let state = indexWindowReducer();
      state = indexWindowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 2,
          perPage: 10,
          fromCount: 11,
          toCount: 17,
        },
      });

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 6,
      });
      assert.deepEqual(state.cursorIndex, 6);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: -1,
      });
      assert.deepEqual(state.cursorIndex, 6);
    });

    it('ignored cases', function() {
      let state;

      // listPagination is not set
      state = indexWindowReducer();
      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      // pageCount is 0
      state = indexWindowReducer();
      state = indexWindowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: {
          pageCount: 0,
        },
      });
      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);
    });
  });
});
