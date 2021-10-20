import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import NewsFeedSagas from '../../../../../app/modules/entities/news-feed/news-feed.sagas';
import NewsFeedActions from '../../../../../app/modules/entities/news-feed/news-feed.reducer';

const { getNewsFeed, getAllNewsFeeds, updateNewsFeed, deleteNewsFeed, searchNewsFeeds } = NewsFeedSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getNewsFeed(1);
  const step = stepper(getNewsFeed(FixtureAPI, { newsFeedId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getNewsFeed(FixtureAPI, { newsFeedId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllNewsFeeds();
  const step = stepper(getAllNewsFeeds(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllNewsFeeds(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateNewsFeed({ id: 1 });
  const step = stepper(updateNewsFeed(FixtureAPI, { newsFeed: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateNewsFeed(FixtureAPI, { newsFeed: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchNewsFeeds();
  const step = stepper(searchNewsFeeds(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchNewsFeeds(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteNewsFeed({ id: 1 });
  const step = stepper(deleteNewsFeed(FixtureAPI, { newsFeedId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteNewsFeed(FixtureAPI, { newsFeedId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NewsFeedActions.newsFeedDeleteFailure()));
});
