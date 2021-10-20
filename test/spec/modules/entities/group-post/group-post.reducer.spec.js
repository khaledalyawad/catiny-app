import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/group-post/group-post.reducer';

test('attempt retrieving a single groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.groupPost).toEqual({ id: undefined });
});

test('attempt retrieving a list of groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.groupPostList).toEqual([]);
});

test('attempt updating a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.groupPost).toEqual({ id: 1 });
});

test('success retrieving a list of groupPost', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.groupPostAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.groupPostList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.groupPost).toEqual({ id: 1 });
});
test('success searching a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.groupPostList).toEqual({ id: 1 });
});
test('success deleting a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.groupPost).toEqual({ id: undefined });
});

test('failure retrieving a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.groupPost).toEqual({ id: undefined });
});

test('failure retrieving a list of groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.groupPostList).toEqual([]);
});

test('failure updating a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.groupPost).toEqual(INITIAL_STATE.groupPost);
});
test('failure searching a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.groupPostList).toEqual([]);
});
test('failure deleting a groupPost', () => {
  const state = reducer(INITIAL_STATE, Actions.groupPostDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.groupPost).toEqual(INITIAL_STATE.groupPost);
});

test('resetting state for groupPost', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.groupPostReset());
  expect(state).toEqual(INITIAL_STATE);
});
