import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/permission/permission.reducer';

test('attempt retrieving a single permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.permission).toEqual({ id: undefined });
});

test('attempt retrieving a list of permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.permissionList).toEqual([]);
});

test('attempt updating a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.permission).toEqual({ id: 1 });
});

test('success retrieving a list of permission', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.permissionAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.permissionList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.permission).toEqual({ id: 1 });
});
test('success searching a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.permissionList).toEqual({ id: 1 });
});
test('success deleting a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.permission).toEqual({ id: undefined });
});

test('failure retrieving a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.permission).toEqual({ id: undefined });
});

test('failure retrieving a list of permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.permissionList).toEqual([]);
});

test('failure updating a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.permission).toEqual(INITIAL_STATE.permission);
});
test('failure searching a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.permissionList).toEqual([]);
});
test('failure deleting a permission', () => {
  const state = reducer(INITIAL_STATE, Actions.permissionDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.permission).toEqual(INITIAL_STATE.permission);
});

test('resetting state for permission', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.permissionReset());
  expect(state).toEqual(INITIAL_STATE);
});
