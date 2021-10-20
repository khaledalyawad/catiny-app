import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FollowGroupSagas from '../../../../../app/modules/entities/follow-group/follow-group.sagas';
import FollowGroupActions from '../../../../../app/modules/entities/follow-group/follow-group.reducer';

const { getFollowGroup, getAllFollowGroups, updateFollowGroup, deleteFollowGroup, searchFollowGroups } = FollowGroupSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFollowGroup(1);
  const step = stepper(getFollowGroup(FixtureAPI, { followGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFollowGroup(FixtureAPI, { followGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFollowGroups();
  const step = stepper(getAllFollowGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFollowGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFollowGroup({ id: 1 });
  const step = stepper(updateFollowGroup(FixtureAPI, { followGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFollowGroup(FixtureAPI, { followGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchFollowGroups();
  const step = stepper(searchFollowGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchFollowGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteFollowGroup({ id: 1 });
  const step = stepper(deleteFollowGroup(FixtureAPI, { followGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFollowGroup(FixtureAPI, { followGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FollowGroupActions.followGroupDeleteFailure()));
});
