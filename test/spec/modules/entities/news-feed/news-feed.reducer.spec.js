import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/news-feed/news-feed.reducer';

test('attempt retrieving a single newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.newsFeed).toEqual({ id: undefined });
});

test('attempt retrieving a list of newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.newsFeedList).toEqual([]);
});

test('attempt updating a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.newsFeed).toEqual({ id: 1 });
});

test('success retrieving a list of newsFeed', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.newsFeedAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.newsFeedList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.newsFeed).toEqual({ id: 1 });
});
test('success searching a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.newsFeedList).toEqual({ id: 1 });
});
test('success deleting a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.newsFeed).toEqual({ id: undefined });
});

test('failure retrieving a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.newsFeed).toEqual({ id: undefined });
});

test('failure retrieving a list of newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.newsFeedList).toEqual([]);
});

test('failure updating a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.newsFeed).toEqual(INITIAL_STATE.newsFeed);
});
test('failure searching a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.newsFeedList).toEqual([]);
});
test('failure deleting a newsFeed', () => {
  const state = reducer(INITIAL_STATE, Actions.newsFeedDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.newsFeed).toEqual(INITIAL_STATE.newsFeed);
});

test('resetting state for newsFeed', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.newsFeedReset());
  expect(state).toEqual(INITIAL_STATE);
});
