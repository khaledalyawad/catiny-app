import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import RankUserSagas from '../../../../../app/modules/entities/rank-user/rank-user.sagas';
import RankUserActions from '../../../../../app/modules/entities/rank-user/rank-user.reducer';

const { getRankUser, getAllRankUsers, updateRankUser, deleteRankUser, searchRankUsers } = RankUserSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getRankUser(1);
  const step = stepper(getRankUser(FixtureAPI, { rankUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankUserActions.rankUserSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getRankUser(FixtureAPI, { rankUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankUserActions.rankUserFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllRankUsers();
  const step = stepper(getAllRankUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankUserActions.rankUserAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllRankUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankUserActions.rankUserAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateRankUser({ id: 1 });
  const step = stepper(updateRankUser(FixtureAPI, { rankUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankUserActions.rankUserUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateRankUser(FixtureAPI, { rankUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankUserActions.rankUserUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchRankUsers();
  const step = stepper(searchRankUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankUserActions.rankUserSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchRankUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankUserActions.rankUserSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteRankUser({ id: 1 });
  const step = stepper(deleteRankUser(FixtureAPI, { rankUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankUserActions.rankUserDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteRankUser(FixtureAPI, { rankUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankUserActions.rankUserDeleteFailure()));
});
