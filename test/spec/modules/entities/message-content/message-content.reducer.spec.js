import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/message-content/message-content.reducer';

test('attempt retrieving a single messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.messageContent).toEqual({ id: undefined });
});

test('attempt retrieving a list of messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.messageContentList).toEqual([]);
});

test('attempt updating a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.messageContent).toEqual({ id: 1 });
});

test('success retrieving a list of messageContent', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.messageContentAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.messageContentList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.messageContent).toEqual({ id: 1 });
});
test('success searching a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.messageContentList).toEqual({ id: 1 });
});
test('success deleting a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.messageContent).toEqual({ id: undefined });
});

test('failure retrieving a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.messageContent).toEqual({ id: undefined });
});

test('failure retrieving a list of messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.messageContentList).toEqual([]);
});

test('failure updating a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.messageContent).toEqual(INITIAL_STATE.messageContent);
});
test('failure searching a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.messageContentList).toEqual([]);
});
test('failure deleting a messageContent', () => {
  const state = reducer(INITIAL_STATE, Actions.messageContentDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.messageContent).toEqual(INITIAL_STATE.messageContent);
});

test('resetting state for messageContent', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.messageContentReset());
  expect(state).toEqual(INITIAL_STATE);
});
