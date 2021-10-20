import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/class-info/class-info.reducer';

test('attempt retrieving a single classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.classInfo).toEqual({ id: undefined });
});

test('attempt retrieving a list of classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.classInfoList).toEqual([]);
});

test('attempt updating a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.classInfo).toEqual({ id: 1 });
});

test('success retrieving a list of classInfo', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.classInfoAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.classInfoList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.classInfo).toEqual({ id: 1 });
});
test('success searching a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.classInfoList).toEqual({ id: 1 });
});
test('success deleting a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.classInfo).toEqual({ id: undefined });
});

test('failure retrieving a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.classInfo).toEqual({ id: undefined });
});

test('failure retrieving a list of classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.classInfoList).toEqual([]);
});

test('failure updating a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.classInfo).toEqual(INITIAL_STATE.classInfo);
});
test('failure searching a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.classInfoList).toEqual([]);
});
test('failure deleting a classInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.classInfoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.classInfo).toEqual(INITIAL_STATE.classInfo);
});

test('resetting state for classInfo', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.classInfoReset());
  expect(state).toEqual(INITIAL_STATE);
});
