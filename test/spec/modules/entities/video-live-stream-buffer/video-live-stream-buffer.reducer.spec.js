import Actions, {
  reducer,
  INITIAL_STATE,
} from '../../../../../app/modules/entities/video-live-stream-buffer/video-live-stream-buffer.reducer';

test('attempt retrieving a single videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.videoLiveStreamBuffer).toEqual({ id: undefined });
});

test('attempt retrieving a list of videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.videoLiveStreamBufferList).toEqual([]);
});

test('attempt updating a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.videoLiveStreamBuffer).toEqual({ id: 1 });
});

test('success retrieving a list of videoLiveStreamBuffer', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.videoLiveStreamBufferAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.videoLiveStreamBufferList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.videoLiveStreamBuffer).toEqual({ id: 1 });
});
test('success searching a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.videoLiveStreamBufferList).toEqual({ id: 1 });
});
test('success deleting a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.videoLiveStreamBuffer).toEqual({ id: undefined });
});

test('failure retrieving a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.videoLiveStreamBuffer).toEqual({ id: undefined });
});

test('failure retrieving a list of videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.videoLiveStreamBufferList).toEqual([]);
});

test('failure updating a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.videoLiveStreamBuffer).toEqual(INITIAL_STATE.videoLiveStreamBuffer);
});
test('failure searching a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.videoLiveStreamBufferList).toEqual([]);
});
test('failure deleting a videoLiveStreamBuffer', () => {
  const state = reducer(INITIAL_STATE, Actions.videoLiveStreamBufferDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.videoLiveStreamBuffer).toEqual(INITIAL_STATE.videoLiveStreamBuffer);
});

test('resetting state for videoLiveStreamBuffer', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.videoLiveStreamBufferReset());
  expect(state).toEqual(INITIAL_STATE);
});
