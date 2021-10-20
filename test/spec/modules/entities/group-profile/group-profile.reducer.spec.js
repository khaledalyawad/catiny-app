import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/group-profile/group-profile.reducer';

test('attempt retrieving a single groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.groupProfile).toEqual({ id: undefined });
});

test('attempt retrieving a list of groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.groupProfileList).toEqual([]);
});

test('attempt updating a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.groupProfile).toEqual({ id: 1 });
});

test('success retrieving a list of groupProfile', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.groupProfileAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.groupProfileList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.groupProfile).toEqual({ id: 1 });
});
test('success searching a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.groupProfileList).toEqual({ id: 1 });
});
test('success deleting a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.groupProfile).toEqual({ id: undefined });
});

test('failure retrieving a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.groupProfile).toEqual({ id: undefined });
});

test('failure retrieving a list of groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.groupProfileList).toEqual([]);
});

test('failure updating a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.groupProfile).toEqual(INITIAL_STATE.groupProfile);
});
test('failure searching a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.groupProfileList).toEqual([]);
});
test('failure deleting a groupProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.groupProfileDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.groupProfile).toEqual(INITIAL_STATE.groupProfile);
});

test('resetting state for groupProfile', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.groupProfileReset());
  expect(state).toEqual(INITIAL_STATE);
});
