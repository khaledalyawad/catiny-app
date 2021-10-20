import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MasterUserSagas from '../../../../../app/modules/entities/master-user/master-user.sagas';
import MasterUserActions from '../../../../../app/modules/entities/master-user/master-user.reducer';

const { getMasterUser, getAllMasterUsers, updateMasterUser, deleteMasterUser, searchMasterUsers } = MasterUserSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMasterUser(1);
  const step = stepper(getMasterUser(FixtureAPI, { masterUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MasterUserActions.masterUserSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMasterUser(FixtureAPI, { masterUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MasterUserActions.masterUserFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMasterUsers();
  const step = stepper(getAllMasterUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MasterUserActions.masterUserAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMasterUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MasterUserActions.masterUserAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMasterUser({ id: 1 });
  const step = stepper(updateMasterUser(FixtureAPI, { masterUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MasterUserActions.masterUserUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMasterUser(FixtureAPI, { masterUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MasterUserActions.masterUserUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchMasterUsers();
  const step = stepper(searchMasterUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MasterUserActions.masterUserSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchMasterUsers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MasterUserActions.masterUserSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteMasterUser({ id: 1 });
  const step = stepper(deleteMasterUser(FixtureAPI, { masterUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MasterUserActions.masterUserDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMasterUser(FixtureAPI, { masterUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MasterUserActions.masterUserDeleteFailure()));
});
