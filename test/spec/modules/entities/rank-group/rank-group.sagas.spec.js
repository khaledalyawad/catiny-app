import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import RankGroupSagas from '../../../../../app/modules/entities/rank-group/rank-group.sagas';
import RankGroupActions from '../../../../../app/modules/entities/rank-group/rank-group.reducer';

const { getRankGroup, getAllRankGroups, updateRankGroup, deleteRankGroup, searchRankGroups } = RankGroupSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getRankGroup(1);
  const step = stepper(getRankGroup(FixtureAPI, { rankGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getRankGroup(FixtureAPI, { rankGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllRankGroups();
  const step = stepper(getAllRankGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllRankGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateRankGroup({ id: 1 });
  const step = stepper(updateRankGroup(FixtureAPI, { rankGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateRankGroup(FixtureAPI, { rankGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchRankGroups();
  const step = stepper(searchRankGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchRankGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteRankGroup({ id: 1 });
  const step = stepper(deleteRankGroup(FixtureAPI, { rankGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteRankGroup(FixtureAPI, { rankGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RankGroupActions.rankGroupDeleteFailure()));
});
