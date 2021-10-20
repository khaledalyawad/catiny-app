import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/page-post/page-post.reducer';

test('attempt retrieving a single pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.pagePost).toEqual({ id: undefined });
});

test('attempt retrieving a list of pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.pagePostList).toEqual([]);
});

test('attempt updating a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.pagePost).toEqual({ id: 1 });
});

test('success retrieving a list of pagePost', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.pagePostAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.pagePostList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.pagePost).toEqual({ id: 1 });
});
test('success searching a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.pagePostList).toEqual({ id: 1 });
});
test('success deleting a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.pagePost).toEqual({ id: undefined });
});

test('failure retrieving a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.pagePost).toEqual({ id: undefined });
});

test('failure retrieving a list of pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.pagePostList).toEqual([]);
});

test('failure updating a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.pagePost).toEqual(INITIAL_STATE.pagePost);
});
test('failure searching a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.pagePostList).toEqual([]);
});
test('failure deleting a pagePost', () => {
  const state = reducer(INITIAL_STATE, Actions.pagePostDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.pagePost).toEqual(INITIAL_STATE.pagePost);
});

test('resetting state for pagePost', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.pagePostReset());
  expect(state).toEqual(INITIAL_STATE);
});
