import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/post/post.reducer';

test('attempt retrieving a single post', () => {
  const state = reducer(INITIAL_STATE, Actions.postRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.post).toEqual({ id: undefined });
});

test('attempt retrieving a list of post', () => {
  const state = reducer(INITIAL_STATE, Actions.postAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.postList).toEqual([]);
});

test('attempt updating a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.post).toEqual({ id: 1 });
});

test('success retrieving a list of post', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.postAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.postList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.post).toEqual({ id: 1 });
});
test('success searching a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.postList).toEqual({ id: 1 });
});
test('success deleting a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.post).toEqual({ id: undefined });
});

test('failure retrieving a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.post).toEqual({ id: undefined });
});

test('failure retrieving a list of post', () => {
  const state = reducer(INITIAL_STATE, Actions.postAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.postList).toEqual([]);
});

test('failure updating a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.post).toEqual(INITIAL_STATE.post);
});
test('failure searching a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.postList).toEqual([]);
});
test('failure deleting a post', () => {
  const state = reducer(INITIAL_STATE, Actions.postDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.post).toEqual(INITIAL_STATE.post);
});

test('resetting state for post', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.postReset());
  expect(state).toEqual(INITIAL_STATE);
});
