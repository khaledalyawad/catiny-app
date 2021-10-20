import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/video/video.reducer';

test('attempt retrieving a single video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.video).toEqual({ id: undefined });
});

test('attempt retrieving a list of video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.videoList).toEqual([]);
});

test('attempt updating a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.video).toEqual({ id: 1 });
});

test('success retrieving a list of video', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.videoAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.videoList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.video).toEqual({ id: 1 });
});
test('success searching a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.videoList).toEqual({ id: 1 });
});
test('success deleting a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.video).toEqual({ id: undefined });
});

test('failure retrieving a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.video).toEqual({ id: undefined });
});

test('failure retrieving a list of video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.videoList).toEqual([]);
});

test('failure updating a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.video).toEqual(INITIAL_STATE.video);
});
test('failure searching a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.videoList).toEqual([]);
});
test('failure deleting a video', () => {
  const state = reducer(INITIAL_STATE, Actions.videoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.video).toEqual(INITIAL_STATE.video);
});

test('resetting state for video', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.videoReset());
  expect(state).toEqual(INITIAL_STATE);
});
