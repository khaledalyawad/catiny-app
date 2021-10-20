import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PageProfileSagas from '../../../../../app/modules/entities/page-profile/page-profile.sagas';
import PageProfileActions from '../../../../../app/modules/entities/page-profile/page-profile.reducer';

const { getPageProfile, getAllPageProfiles, updatePageProfile, deletePageProfile, searchPageProfiles } = PageProfileSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPageProfile(1);
  const step = stepper(getPageProfile(FixtureAPI, { pageProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPageProfile(FixtureAPI, { pageProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPageProfiles();
  const step = stepper(getAllPageProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPageProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePageProfile({ id: 1 });
  const step = stepper(updatePageProfile(FixtureAPI, { pageProfile: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePageProfile(FixtureAPI, { pageProfile: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPageProfiles();
  const step = stepper(searchPageProfiles(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPageProfiles(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePageProfile({ id: 1 });
  const step = stepper(deletePageProfile(FixtureAPI, { pageProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePageProfile(FixtureAPI, { pageProfileId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PageProfileActions.pageProfileDeleteFailure()));
});
