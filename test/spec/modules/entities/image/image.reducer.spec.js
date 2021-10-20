import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/image/image.reducer';

test('attempt retrieving a single image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.image).toEqual({ id: undefined });
});

test('attempt retrieving a list of image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.imageList).toEqual([]);
});

test('attempt updating a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.image).toEqual({ id: 1 });
});

test('success retrieving a list of image', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.imageAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.imageList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.image).toEqual({ id: 1 });
});
test('success searching a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.imageList).toEqual({ id: 1 });
});
test('success deleting a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.image).toEqual({ id: undefined });
});

test('failure retrieving a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.image).toEqual({ id: undefined });
});

test('failure retrieving a list of image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.imageList).toEqual([]);
});

test('failure updating a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.image).toEqual(INITIAL_STATE.image);
});
test('failure searching a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.imageList).toEqual([]);
});
test('failure deleting a image', () => {
  const state = reducer(INITIAL_STATE, Actions.imageDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.image).toEqual(INITIAL_STATE.image);
});

test('resetting state for image', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.imageReset());
  expect(state).toEqual(INITIAL_STATE);
});
