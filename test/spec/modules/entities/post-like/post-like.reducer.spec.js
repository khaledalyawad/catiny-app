import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/post-like/post-like.reducer';

test('attempt retrieving a single postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.postLike).toEqual({ id: undefined });
});

test('attempt retrieving a list of postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.postLikeList).toEqual([]);
});

test('attempt updating a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.postLike).toEqual({ id: 1 });
});

test('success retrieving a list of postLike', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.postLikeAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.postLikeList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.postLike).toEqual({ id: 1 });
});
test('success searching a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.postLikeList).toEqual({ id: 1 });
});
test('success deleting a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.postLike).toEqual({ id: undefined });
});

test('failure retrieving a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.postLike).toEqual({ id: undefined });
});

test('failure retrieving a list of postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.postLikeList).toEqual([]);
});

test('failure updating a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.postLike).toEqual(INITIAL_STATE.postLike);
});
test('failure searching a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.postLikeList).toEqual([]);
});
test('failure deleting a postLike', () => {
  const state = reducer(INITIAL_STATE, Actions.postLikeDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.postLike).toEqual(INITIAL_STATE.postLike);
});

test('resetting state for postLike', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.postLikeReset());
  expect(state).toEqual(INITIAL_STATE);
});
