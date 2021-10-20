import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/post-comment/post-comment.reducer';

test('attempt retrieving a single postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.postComment).toEqual({ id: undefined });
});

test('attempt retrieving a list of postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.postCommentList).toEqual([]);
});

test('attempt updating a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.postComment).toEqual({ id: 1 });
});

test('success retrieving a list of postComment', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.postCommentAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.postCommentList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.postComment).toEqual({ id: 1 });
});
test('success searching a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.postCommentList).toEqual({ id: 1 });
});
test('success deleting a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.postComment).toEqual({ id: undefined });
});

test('failure retrieving a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.postComment).toEqual({ id: undefined });
});

test('failure retrieving a list of postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.postCommentList).toEqual([]);
});

test('failure updating a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.postComment).toEqual(INITIAL_STATE.postComment);
});
test('failure searching a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.postCommentList).toEqual([]);
});
test('failure deleting a postComment', () => {
  const state = reducer(INITIAL_STATE, Actions.postCommentDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.postComment).toEqual(INITIAL_STATE.postComment);
});

test('resetting state for postComment', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.postCommentReset());
  expect(state).toEqual(INITIAL_STATE);
});
