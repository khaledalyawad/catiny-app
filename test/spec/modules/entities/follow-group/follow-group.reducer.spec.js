import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/follow-group/follow-group.reducer';

test('attempt retrieving a single followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.followGroup).toEqual({ id: undefined });
});

test('attempt retrieving a list of followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.followGroupList).toEqual([]);
});

test('attempt updating a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.followGroup).toEqual({ id: 1 });
});

test('success retrieving a list of followGroup', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.followGroupAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.followGroupList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.followGroup).toEqual({ id: 1 });
});
test('success searching a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.followGroupList).toEqual({ id: 1 });
});
test('success deleting a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.followGroup).toEqual({ id: undefined });
});

test('failure retrieving a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.followGroup).toEqual({ id: undefined });
});

test('failure retrieving a list of followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.followGroupList).toEqual([]);
});

test('failure updating a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.followGroup).toEqual(INITIAL_STATE.followGroup);
});
test('failure searching a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.followGroupList).toEqual([]);
});
test('failure deleting a followGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.followGroupDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.followGroup).toEqual(INITIAL_STATE.followGroup);
});

test('resetting state for followGroup', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.followGroupReset());
  expect(state).toEqual(INITIAL_STATE);
});
