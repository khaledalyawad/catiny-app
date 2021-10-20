import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/file-info/file-info.reducer';

test('attempt retrieving a single fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.fileInfo).toEqual({ id: undefined });
});

test('attempt retrieving a list of fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.fileInfoList).toEqual([]);
});

test('attempt updating a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.fileInfo).toEqual({ id: 1 });
});

test('success retrieving a list of fileInfo', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.fileInfoAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.fileInfoList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.fileInfo).toEqual({ id: 1 });
});
test('success searching a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.fileInfoList).toEqual({ id: 1 });
});
test('success deleting a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.fileInfo).toEqual({ id: undefined });
});

test('failure retrieving a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.fileInfo).toEqual({ id: undefined });
});

test('failure retrieving a list of fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.fileInfoList).toEqual([]);
});

test('failure updating a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.fileInfo).toEqual(INITIAL_STATE.fileInfo);
});
test('failure searching a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.fileInfoList).toEqual([]);
});
test('failure deleting a fileInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.fileInfoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.fileInfo).toEqual(INITIAL_STATE.fileInfo);
});

test('resetting state for fileInfo', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.fileInfoReset());
  expect(state).toEqual(INITIAL_STATE);
});
