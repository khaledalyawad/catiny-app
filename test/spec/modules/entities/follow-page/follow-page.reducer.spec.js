import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/follow-page/follow-page.reducer';

test('attempt retrieving a single followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.followPage).toEqual({ id: undefined });
});

test('attempt retrieving a list of followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.followPageList).toEqual([]);
});

test('attempt updating a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.followPage).toEqual({ id: 1 });
});

test('success retrieving a list of followPage', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.followPageAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.followPageList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.followPage).toEqual({ id: 1 });
});
test('success searching a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.followPageList).toEqual({ id: 1 });
});
test('success deleting a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.followPage).toEqual({ id: undefined });
});

test('failure retrieving a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.followPage).toEqual({ id: undefined });
});

test('failure retrieving a list of followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.followPageList).toEqual([]);
});

test('failure updating a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.followPage).toEqual(INITIAL_STATE.followPage);
});
test('failure searching a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.followPageList).toEqual([]);
});
test('failure deleting a followPage', () => {
  const state = reducer(INITIAL_STATE, Actions.followPageDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.followPage).toEqual(INITIAL_STATE.followPage);
});

test('resetting state for followPage', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.followPageReset());
  expect(state).toEqual(INITIAL_STATE);
});
