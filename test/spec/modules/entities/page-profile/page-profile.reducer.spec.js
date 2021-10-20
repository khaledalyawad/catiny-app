import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/page-profile/page-profile.reducer';

test('attempt retrieving a single pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.pageProfile).toEqual({ id: undefined });
});

test('attempt retrieving a list of pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.pageProfileList).toEqual([]);
});

test('attempt updating a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.pageProfile).toEqual({ id: 1 });
});

test('success retrieving a list of pageProfile', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.pageProfileAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.pageProfileList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.pageProfile).toEqual({ id: 1 });
});
test('success searching a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.pageProfileList).toEqual({ id: 1 });
});
test('success deleting a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.pageProfile).toEqual({ id: undefined });
});

test('failure retrieving a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.pageProfile).toEqual({ id: undefined });
});

test('failure retrieving a list of pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.pageProfileList).toEqual([]);
});

test('failure updating a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.pageProfile).toEqual(INITIAL_STATE.pageProfile);
});
test('failure searching a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.pageProfileList).toEqual([]);
});
test('failure deleting a pageProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.pageProfileDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.pageProfile).toEqual(INITIAL_STATE.pageProfile);
});

test('resetting state for pageProfile', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.pageProfileReset());
  expect(state).toEqual(INITIAL_STATE);
});
