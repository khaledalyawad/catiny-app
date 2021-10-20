import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/follow-user/follow-user.reducer';

test('attempt retrieving a single followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.followUser).toEqual({ id: undefined });
});

test('attempt retrieving a list of followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.followUserList).toEqual([]);
});

test('attempt updating a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.followUser).toEqual({ id: 1 });
});

test('success retrieving a list of followUser', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.followUserAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.followUserList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.followUser).toEqual({ id: 1 });
});
test('success searching a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.followUserList).toEqual({ id: 1 });
});
test('success deleting a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.followUser).toEqual({ id: undefined });
});

test('failure retrieving a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.followUser).toEqual({ id: undefined });
});

test('failure retrieving a list of followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.followUserList).toEqual([]);
});

test('failure updating a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.followUser).toEqual(INITIAL_STATE.followUser);
});
test('failure searching a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.followUserList).toEqual([]);
});
test('failure deleting a followUser', () => {
  const state = reducer(INITIAL_STATE, Actions.followUserDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.followUser).toEqual(INITIAL_STATE.followUser);
});

test('resetting state for followUser', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.followUserReset());
  expect(state).toEqual(INITIAL_STATE);
});
