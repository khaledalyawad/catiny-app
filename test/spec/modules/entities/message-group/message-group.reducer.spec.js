import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/message-group/message-group.reducer';

test('attempt retrieving a single messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.messageGroup).toEqual({ id: undefined });
});

test('attempt retrieving a list of messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.messageGroupList).toEqual([]);
});

test('attempt updating a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.messageGroup).toEqual({ id: 1 });
});

test('success retrieving a list of messageGroup', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.messageGroupAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.messageGroupList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.messageGroup).toEqual({ id: 1 });
});
test('success searching a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.messageGroupList).toEqual({ id: 1 });
});
test('success deleting a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.messageGroup).toEqual({ id: undefined });
});

test('failure retrieving a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.messageGroup).toEqual({ id: undefined });
});

test('failure retrieving a list of messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.messageGroupList).toEqual([]);
});

test('failure updating a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.messageGroup).toEqual(INITIAL_STATE.messageGroup);
});
test('failure searching a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.messageGroupList).toEqual([]);
});
test('failure deleting a messageGroup', () => {
  const state = reducer(INITIAL_STATE, Actions.messageGroupDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.messageGroup).toEqual(INITIAL_STATE.messageGroup);
});

test('resetting state for messageGroup', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.messageGroupReset());
  expect(state).toEqual(INITIAL_STATE);
});
