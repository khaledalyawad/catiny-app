import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/master-user/master-user.reducer';

test('attempt retrieving a single masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.masterUser).toEqual({ id: undefined });
});

test('attempt retrieving a list of masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.masterUserList).toEqual([]);
});

test('attempt updating a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.masterUser).toEqual({ id: 1 });
});

test('success retrieving a list of masterUser', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.masterUserAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.masterUserList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.masterUser).toEqual({ id: 1 });
});
test('success searching a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.masterUserList).toEqual({ id: 1 });
});
test('success deleting a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.masterUser).toEqual({ id: undefined });
});

test('failure retrieving a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.masterUser).toEqual({ id: undefined });
});

test('failure retrieving a list of masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.masterUserList).toEqual([]);
});

test('failure updating a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.masterUser).toEqual(INITIAL_STATE.masterUser);
});
test('failure searching a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.masterUserList).toEqual([]);
});
test('failure deleting a masterUser', () => {
  const state = reducer(INITIAL_STATE, Actions.masterUserDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.masterUser).toEqual(INITIAL_STATE.masterUser);
});

test('resetting state for masterUser', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.masterUserReset());
  expect(state).toEqual(INITIAL_STATE);
});
