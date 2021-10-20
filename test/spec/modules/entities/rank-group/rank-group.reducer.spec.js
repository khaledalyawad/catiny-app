import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/rank-group/rank-group.reducer';

test('attempt retrieving a single rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.rankGroup).toEqual({ id: undefined });
});

test('attempt retrieving a list of rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.rankGroupList).toEqual([]);
});

test('attempt updating a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.rankGroup).toEqual({ id: 1 });
});

test('success retrieving a list of rankGroup', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.rankGroupAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.rankGroupList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.rankGroup).toEqual({ id: 1 });
});
test('success searching a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.rankGroupList).toEqual({ id: 1 });
});
test('success deleting a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.rankGroup).toEqual({ id: undefined });
});

test('failure retrieving a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.rankGroup).toEqual({ id: undefined });
});

test('failure retrieving a list of rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.rankGroupList).toEqual([]);
});

test('failure updating a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.rankGroup).toEqual(INITIAL_STATE.rankGroup);
});
test('failure searching a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.rankGroupList).toEqual([]);
});
test('failure deleting a rankGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.rankGroupDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.rankGroup).toEqual(INITIAL_STATE.rankGroup);
});

test('resetting state for rankGroup', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.rankGroupReset());
  expect(state).toEqual(INITIAL_STATE);
});
