import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/hanh-chinh-vn/hanh-chinh-vn.reducer';

test('attempt retrieving a single hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.hanhChinhVN).toEqual({ id: undefined });
});

test('attempt retrieving a list of hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.hanhChinhVNList).toEqual([]);
});

test('attempt updating a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.hanhChinhVN).toEqual({ id: 1 });
});

test('success retrieving a list of hanhChinhVN', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.hanhChinhVNAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.hanhChinhVNList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.hanhChinhVN).toEqual({ id: 1 });
});
test('success searching a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.hanhChinhVNList).toEqual({ id: 1 });
});
test('success deleting a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.hanhChinhVN).toEqual({ id: undefined });
});

test('failure retrieving a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.hanhChinhVN).toEqual({ id: undefined });
});

test('failure retrieving a list of hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.hanhChinhVNList).toEqual([]);
});

test('failure updating a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.hanhChinhVN).toEqual(INITIAL_STATE.hanhChinhVN);
});
test('failure searching a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.hanhChinhVNList).toEqual([]);
});
test('failure deleting a hanhChinhVN', () => {
  const state = reducer(INITIAL_STATE, Actions.hanhChinhVNDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.hanhChinhVN).toEqual(INITIAL_STATE.hanhChinhVN);
});

test('resetting state for hanhChinhVN', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.hanhChinhVNReset());
  expect(state).toEqual(INITIAL_STATE);
});
