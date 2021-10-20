import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import GroupProfileSagas from '../../../../../app/modules/entities/group-profile/group-profile.sagas';
import GroupProfileActions from '../../../../../app/modules/entities/group-profile/group-profile.reducer';

const { getGroupProfile, getAllGroupProfiles, updateGroupProfile, deleteGroupProfile, searchGroupProfiles } = GroupProfileSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getGroupProfile(1);
  const step = stepper(getGroupProfile(FixtureAPI, { groupProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getGroupProfile(FixtureAPI, { groupProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllGroupProfiles();
  const step = stepper(getAllGroupProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllGroupProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateGroupProfile({ id: 1 });
  const step = stepper(updateGroupProfile(FixtureAPI, { groupProfile: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateGroupProfile(FixtureAPI, { groupProfile: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchGroupProfiles();
  const step = stepper(searchGroupProfiles(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchGroupProfiles(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteGroupProfile({ id: 1 });
  const step = stepper(deleteGroupProfile(FixtureAPI, { groupProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteGroupProfile(FixtureAPI, { groupProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupProfileActions.groupProfileDeleteFailure()));
});
