import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/topic-interest/topic-interest.reducer';

test('attempt retrieving a single topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.topicInterest).toEqual({ id: undefined });
});

test('attempt retrieving a list of topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.topicInterestList).toEqual([]);
});

test('attempt updating a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt searching a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestSearchRequest(1));

  expect(state.searching).toBe(true);
});
test('attempt to deleting a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.topicInterest).toEqual({ id: 1 });
});

test('success retrieving a list of topicInterest', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.topicInterestAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.topicInterestList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.topicInterest).toEqual({ id: 1 });
});
test('success searching a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestSearchSuccess({ id: 1 }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toBe(null);
  expect(state.topicInterestList).toEqual({ id: 1 });
});
test('success deleting a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.topicInterest).toEqual({ id: undefined });
});

test('failure retrieving a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.topicInterest).toEqual({ id: undefined });
});

test('failure retrieving a list of topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.topicInterestList).toEqual([]);
});

test('failure updating a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.topicInterest).toEqual(INITIAL_STATE.topicInterest);
});
test('failure searching a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestSearchFailure({ error: 'Not found' }));

  expect(state.searching).toBe(false);
  expect(state.errorSearching).toEqual({ error: 'Not found' });
  expect(state.topicInterestList).toEqual([]);
});
test('failure deleting a topicInterest', () => {
  const state = reducer(INITIAL_STATE, Actions.topicInterestDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.topicInterest).toEqual(INITIAL_STATE.topicInterest);
});

test('resetting state for topicInterest', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.topicInterestReset());
  expect(state).toEqual(INITIAL_STATE);
});
