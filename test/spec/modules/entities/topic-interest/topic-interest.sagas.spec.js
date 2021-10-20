import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import TopicInterestSagas from '../../../../../app/modules/entities/topic-interest/topic-interest.sagas';
import TopicInterestActions from '../../../../../app/modules/entities/topic-interest/topic-interest.reducer';

const { getTopicInterest, getAllTopicInterests, updateTopicInterest, deleteTopicInterest, searchTopicInterests } = TopicInterestSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getTopicInterest(1);
  const step = stepper(getTopicInterest(FixtureAPI, { topicInterestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getTopicInterest(FixtureAPI, { topicInterestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllTopicInterests();
  const step = stepper(getAllTopicInterests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllTopicInterests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateTopicInterest({ id: 1 });
  const step = stepper(updateTopicInterest(FixtureAPI, { topicInterest: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateTopicInterest(FixtureAPI, { topicInterest: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchTopicInterests();
  const step = stepper(searchTopicInterests(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchTopicInterests(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteTopicInterest({ id: 1 });
  const step = stepper(deleteTopicInterest(FixtureAPI, { topicInterestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteTopicInterest(FixtureAPI, { topicInterestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TopicInterestActions.topicInterestDeleteFailure()));
});
