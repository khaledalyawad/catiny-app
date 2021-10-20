import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/history-update/history-update.reducer';

test('attempt retrieving a single historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.historyUpdate).toEqual({ id: undefined });
});

test('attempt retrieving a list of historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.historyUpdateList).toEqual([]);
});

test('attempt updating a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.historyUpdate).toEqual({ id: 1 });
});

test('success retrieving a list of historyUpdate', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.historyUpdateAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.historyUpdateList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.historyUpdate).toEqual({ id: 1 });
});
test('success searching a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.historyUpdateList).toEqual({ id: 1 });
});
test('success deleting a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.historyUpdate).toEqual({ id: undefined });
});

test('failure retrieving a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.historyUpdate).toEqual({ id: undefined });
});

test('failure retrieving a list of historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.historyUpdateList).toEqual([]);
});

test('failure updating a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.historyUpdate).toEqual(INITIAL_STATE.historyUpdate);
});
test('failure searching a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.historyUpdateList).toEqual([]);
});
test('failure deleting a historyUpdate', () => {
  const state = reducer(INITIAL_STATE, Actions.historyUpdateDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.historyUpdate).toEqual(INITIAL_STATE.historyUpdate);
});

test('resetting state for historyUpdate', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.historyUpdateReset());
  expect(state).toEqual(INITIAL_STATE);
});
