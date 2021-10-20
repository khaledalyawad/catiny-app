import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/base-info/base-info.reducer';

test('attempt retrieving a single baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.baseInfo).toEqual({ id: undefined });
});

test('attempt retrieving a list of baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.baseInfoList).toEqual([]);
});

test('attempt updating a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.baseInfo).toEqual({ id: 1 });
});

test('success retrieving a list of baseInfo', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.baseInfoAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.baseInfoList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.baseInfo).toEqual({ id: 1 });
});
test('success searching a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.baseInfoList).toEqual({ id: 1 });
});
test('success deleting a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.baseInfo).toEqual({ id: undefined });
});

test('failure retrieving a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.baseInfo).toEqual({ id: undefined });
});

test('failure retrieving a list of baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.baseInfoList).toEqual([]);
});

test('failure updating a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.baseInfo).toEqual(INITIAL_STATE.baseInfo);
});
test('failure searching a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.baseInfoList).toEqual([]);
});
test('failure deleting a baseInfo', () => {
  const state = reducer(INITIAL_STATE, Actions.baseInfoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.baseInfo).toEqual(INITIAL_STATE.baseInfo);
});

test('resetting state for baseInfo', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.baseInfoReset());
  expect(state).toEqual(INITIAL_STATE);
});
