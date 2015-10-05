import _ from 'lodash';
import assert from 'power-assert';

import ActionTypes from 'consts/ActionTypes';
import ListingMixin from 'models/mixins/ListingMixin';
import indexWindowReducer, {
  expandCommands,
}from 'reducers/index-window';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('expandCommands', function() {
    const rightAndLeftCommandTemplate = 'list -p <%= page %>';
    const actionCommandTemplate = 'show <%= id %>:<%= name %>';

    const list = {};
    Object.assign(list, ListingMixin);
    list._initializeListingMixin();
    list._listObjects = [
      { id: 'xxx1', name: 'Taro'},
      { id: 'xxx2', name: 'Jiro'},
      { id: 'xxx3', name: 'Saburo'},
      { id: 'xxx4', name: 'Shiro'},
      { id: 'xxx5', name: 'Goro'},
    ];

    assert.deepEqual(
      expandCommands(list.getListPagination(2, 2), 0, { rightAndLeftCommandTemplate, actionCommandTemplate }),
      {
        leftCommand: 'list -p 1',
        rightCommand: 'list -p 3',
        actionCommand: 'show xxx3:Saburo',
      }
    );

    assert.deepEqual(
      expandCommands(list.getListPagination(2, 1), 0, { rightAndLeftCommandTemplate, actionCommandTemplate }),
      {
        leftCommand: 'list -p 3',
        rightCommand: 'list -p 2',
        actionCommand: 'show xxx1:Taro',
      }
    );

    assert.deepEqual(
      expandCommands(list.getListPagination(2, 3), 0, { rightAndLeftCommandTemplate, actionCommandTemplate }),
      {
        leftCommand: 'list -p 2',
        rightCommand: 'list -p 1',
        actionCommand: 'show xxx5:Goro',
      }
    );

    // Not selected by cursor
    assert.deepEqual(
      expandCommands(list.getListPagination(2, 2), 99, { rightAndLeftCommandTemplate, actionCommandTemplate }),
      {
        leftCommand: 'list -p 1',
        rightCommand: 'list -p 3',
        actionCommand: '',
      }
    );

    // page count is 0
    assert.deepEqual(
      expandCommands({ pageCount: 0 }, 0, { rightAndLeftCommandTemplate, actionCommandTemplate }),
      {
        leftCommand: '',
        rightCommand: '',
        actionCommand: '',
      }
    );
  });

  it('ACTIVATE_INDEX_WINDOW, INACTIVATE_INDEX_WINDOW', function() {
    let state = indexWindowReducer();
    assert.deepEqual(state.listPagination, null);
    assert.deepEqual(state.rightAndLeftCommandTemplate, '');
    assert.deepEqual(state.actionCommandTemplate, '');

    state = indexWindowReducer(state, {
      type: ActionTypes.ACTIVATE_INDEX_WINDOW,
      listPagination: {},
      rightAndLeftCommandTemplate: 'right_and_left',
      actionCommandTemplate: 'enter',
    });
    assert.deepEqual(state.listPagination, {});
    assert.deepEqual(state.rightAndLeftCommandTemplate, 'right_and_left');
    assert.deepEqual(state.actionCommandTemplate, 'enter');

    state = indexWindowReducer(state, {
      type: ActionTypes.INACTIVATE_INDEX_WINDOW,
    });
    assert.deepEqual(state.listPagination, null);
  });


  context('MOVE_INDEX_WINDOW_CURSOR', function() {

    it('should be', function() {
      const model = Object.assign({}, ListingMixin);
      model._initializeListingMixin();
      model._listObjects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

      let state = indexWindowReducer();
      assert.deepEqual(state.cursorIndex, 0);

      state = indexWindowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: model.getListPagination(5, 1),
        rightAndLeftCommandTemplate: '',
        actionCommandTemplate: 'show <%= id %>',
      });
      assert.deepEqual(state.actionCommand, 'show 1');

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 1);
      assert.deepEqual(state.actionCommand, 'show 2');

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 3,
      });
      assert.deepEqual(state.cursorIndex, 4);
      assert.deepEqual(state.actionCommand, 'show 5');

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);

      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: -1,
      });
      assert.deepEqual(state.cursorIndex, 4);
    });

    it('short rotation', function() {
      const model = Object.assign({}, ListingMixin);
      model._initializeListingMixin();
      model._listObjects = _.range(10).map(i => { id: i * 10 });

      let state = indexWindowReducer();
      state = indexWindowReducer(state, {
        type: ActionTypes.ACTIVATE_INDEX_WINDOW,
        listPagination: model.getListPagination(7, 1),
        rightAndLeftCommandTemplate: '',
        actionCommandTemplate: '',
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
        rightAndLeftCommandTemplate: '',
        actionCommandTemplate: '',
      });
      state = indexWindowReducer(state, {
        type: ActionTypes.MOVE_INDEX_WINDOW_CURSOR,
        relativeIndex: 1,
      });
      assert.deepEqual(state.cursorIndex, 0);
    });
  });
});
