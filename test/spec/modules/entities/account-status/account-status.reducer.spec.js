import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/account-status/account-status.reducer';

test('attempt retrieving a single accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.accountStatus).toEqual({ id: undefined });
});

test('attempt retrieving a list of accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.accountStatusList).toEqual([]);
});

test('attempt updating a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.accountStatus).toEqual({ id: 1 });
});

test('success retrieving a list of accountStatus', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.accountStatusAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.accountStatusList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.accountStatus).toEqual({ id: 1 });
});
test('success searching a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.accountStatusList).toEqual({ id: 1 });
});
test('success deleting a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.accountStatus).toEqual({ id: undefined });
});

test('failure retrieving a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.accountStatus).toEqual({ id: undefined });
});

test('failure retrieving a list of accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.accountStatusList).toEqual([]);
});

test('failure updating a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.accountStatus).toEqual(INITIAL_STATE.accountStatus);
});
test('failure searching a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.accountStatusList).toEqual([]);
});
test('failure deleting a accountStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.accountStatusDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.accountStatus).toEqual(INITIAL_STATE.accountStatus);
});

test('resetting state for accountStatus', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.accountStatusReset());
  expect(state).toEqual(INITIAL_STATE);
});
