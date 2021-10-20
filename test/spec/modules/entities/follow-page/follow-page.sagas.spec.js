import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FollowPageSagas from '../../../../../app/modules/entities/follow-page/follow-page.sagas';
import FollowPageActions from '../../../../../app/modules/entities/follow-page/follow-page.reducer';

const { getFollowPage, getAllFollowPages, updateFollowPage, deleteFollowPage, searchFollowPages } = FollowPageSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFollowPage(1);
  const step = stepper(getFollowPage(FixtureAPI, { followPageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowPageActions.followPageSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFollowPage(FixtureAPI, { followPageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowPageActions.followPageFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFollowPages();
  const step = stepper(getAllFollowPages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowPageActions.followPageAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFollowPages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowPageActions.followPageAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFollowPage({ id: 1 });
  const step = stepper(updateFollowPage(FixtureAPI, { followPage: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowPageActions.followPageUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFollowPage(FixtureAPI, { followPage: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowPageActions.followPageUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchFollowPages();
  const step = stepper(searchFollowPages(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowPageActions.followPageSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchFollowPages(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowPageActions.followPageSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteFollowPage({ id: 1 });
  const step = stepper(deleteFollowPage(FixtureAPI, { followPageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowPageActions.followPageDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFollowPage(FixtureAPI, { followPageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowPageActions.followPageDeleteFailure()));
});
