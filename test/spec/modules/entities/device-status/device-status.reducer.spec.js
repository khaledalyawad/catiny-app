import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/device-status/device-status.reducer';

test('attempt retrieving a single deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.deviceStatus).toEqual({ id: undefined });
});

test('attempt retrieving a list of deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.deviceStatusList).toEqual([]);
});

test('attempt updating a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.deviceStatus).toEqual({ id: 1 });
});

test('success retrieving a list of deviceStatus', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.deviceStatusAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.deviceStatusList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.deviceStatus).toEqual({ id: 1 });
});
test('success searching a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.deviceStatusList).toEqual({ id: 1 });
});
test('success deleting a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.deviceStatus).toEqual({ id: undefined });
});

test('failure retrieving a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.deviceStatus).toEqual({ id: undefined });
});

test('failure retrieving a list of deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.deviceStatusList).toEqual([]);
});

test('failure updating a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.deviceStatus).toEqual(INITIAL_STATE.deviceStatus);
});
test('failure searching a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.deviceStatusList).toEqual([]);
});
test('failure deleting a deviceStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceStatusDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.deviceStatus).toEqual(INITIAL_STATE.deviceStatus);
});

test('resetting state for deviceStatus', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.deviceStatusReset());
  expect(state).toEqual(INITIAL_STATE);
});
