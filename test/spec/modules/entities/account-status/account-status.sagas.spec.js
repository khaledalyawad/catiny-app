import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AccountStatusSagas from '../../../../../app/modules/entities/account-status/account-status.sagas';
import AccountStatusActions from '../../../../../app/modules/entities/account-status/account-status.reducer';

const { getAccountStatus, getAllAccountStatuses, updateAccountStatus, deleteAccountStatus, searchAccountStatuses } = AccountStatusSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAccountStatus(1);
  const step = stepper(getAccountStatus(FixtureAPI, { accountStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAccountStatus(FixtureAPI, { accountStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAccountStatuses();
  const step = stepper(getAllAccountStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAccountStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAccountStatus({ id: 1 });
  const step = stepper(updateAccountStatus(FixtureAPI, { accountStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAccountStatus(FixtureAPI, { accountStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchAccountStatuses();
  const step = stepper(searchAccountStatuses(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchAccountStatuses(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteAccountStatus({ id: 1 });
  const step = stepper(deleteAccountStatus(FixtureAPI, { accountStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAccountStatus(FixtureAPI, { accountStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountStatusActions.accountStatusDeleteFailure()));
});
