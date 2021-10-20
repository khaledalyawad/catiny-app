import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FollowUserSagas from '../../../../../app/modules/entities/follow-user/follow-user.sagas';
import FollowUserActions from '../../../../../app/modules/entities/follow-user/follow-user.reducer';

const { getFollowUser, getAllFollowUsers, updateFollowUser, deleteFollowUser, searchFollowUsers } = FollowUserSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFollowUser(1);
  const step = stepper(getFollowUser(FixtureAPI, { followUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowUserActions.followUserSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFollowUser(FixtureAPI, { followUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowUserActions.followUserFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFollowUsers();
  const step = stepper(getAllFollowUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowUserActions.followUserAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFollowUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowUserActions.followUserAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFollowUser({ id: 1 });
  const step = stepper(updateFollowUser(FixtureAPI, { followUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowUserActions.followUserUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFollowUser(FixtureAPI, { followUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowUserActions.followUserUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchFollowUsers();
  const step = stepper(searchFollowUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowUserActions.followUserSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchFollowUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowUserActions.followUserSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteFollowUser({ id: 1 });
  const step = stepper(deleteFollowUser(FixtureAPI, { followUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowUserActions.followUserDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFollowUser(FixtureAPI, { followUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowUserActions.followUserDeleteFailure()));
});
