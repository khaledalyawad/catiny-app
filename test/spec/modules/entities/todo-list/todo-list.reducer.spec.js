import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/todo-list/todo-list.reducer';

test('attempt retrieving a single todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.todoList).toEqual({ id: undefined });
});

test('attempt retrieving a list of todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.todoListList).toEqual([]);
});

test('attempt updating a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.todoList).toEqual({ id: 1 });
});

test('success retrieving a list of todoList', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.todoListAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.todoListList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.todoList).toEqual({ id: 1 });
});
test('success searching a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.todoListList).toEqual({ id: 1 });
});
test('success deleting a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.todoList).toEqual({ id: undefined });
});

test('failure retrieving a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.todoList).toEqual({ id: undefined });
});

test('failure retrieving a list of todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.todoListList).toEqual([]);
});

test('failure updating a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.todoList).toEqual(INITIAL_STATE.todoList);
});
test('failure searching a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.todoListList).toEqual([]);
});
test('failure deleting a todoList', () => {
  const state = reducer(INITIAL_STATE, Actions.todoListDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.todoList).toEqual(INITIAL_STATE.todoList);
});

test('resetting state for todoList', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.todoListReset());
  expect(state).toEqual(INITIAL_STATE);
});
