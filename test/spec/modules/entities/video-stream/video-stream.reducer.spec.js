import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/video-stream/video-stream.reducer';

test('attempt retrieving a single videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.videoStream).toEqual({ id: undefined });
});

test('attempt retrieving a list of videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.videoStreamList).toEqual([]);
});

test('attempt updating a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.videoStream).toEqual({ id: 1 });
});

test('success retrieving a list of videoStream', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.videoStreamAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.videoStreamList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.videoStream).toEqual({ id: 1 });
});
test('success searching a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.videoStreamList).toEqual({ id: 1 });
});
test('success deleting a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.videoStream).toEqual({ id: undefined });
});

test('failure retrieving a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.videoStream).toEqual({ id: undefined });
});

test('failure retrieving a list of videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.videoStreamList).toEqual([]);
});

test('failure updating a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.videoStream).toEqual(INITIAL_STATE.videoStream);
});
test('failure searching a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.videoStreamList).toEqual([]);
});
test('failure deleting a videoStream', () => {
  const state = reducer(INITIAL_STATE, Actions.videoStreamDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.videoStream).toEqual(INITIAL_STATE.videoStream);
});

test('resetting state for videoStream', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.videoStreamReset());
  expect(state).toEqual(INITIAL_STATE);
});
