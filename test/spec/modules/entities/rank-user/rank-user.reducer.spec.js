import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/rank-user/rank-user.reducer';

test('attempt retrieving a single rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.rankUser).toEqual({ id: undefined });
});

test('attempt retrieving a list of rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.rankUserList).toEqual([]);
});

test('attempt updating a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.rankUser).toEqual({ id: 1 });
});

test('success retrieving a list of rankUser', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.rankUserAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.rankUserList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.rankUser).toEqual({ id: 1 });
});
test('success searching a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.rankUserList).toEqual({ id: 1 });
});
test('success deleting a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.rankUser).toEqual({ id: undefined });
});

test('failure retrieving a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.rankUser).toEqual({ id: undefined });
});

test('failure retrieving a list of rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.rankUserList).toEqual([]);
});

test('failure updating a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.rankUser).toEqual(INITIAL_STATE.rankUser);
});
test('failure searching a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.rankUserList).toEqual([]);
});
test('failure deleting a rankUser', () => {
  const state = reducer(INITIAL_STATE, Actions.rankUserDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.rankUser).toEqual(INITIAL_STATE.rankUser);
});

test('resetting state for rankUser', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.rankUserReset());
  expect(state).toEqual(INITIAL_STATE);
});
