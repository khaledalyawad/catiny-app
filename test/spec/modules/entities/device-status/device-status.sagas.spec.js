import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import DeviceStatusSagas from '../../../../../app/modules/entities/device-status/device-status.sagas';
import DeviceStatusActions from '../../../../../app/modules/entities/device-status/device-status.reducer';

const { getDeviceStatus, getAllDeviceStatuses, updateDeviceStatus, deleteDeviceStatus, searchDeviceStatuses } = DeviceStatusSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getDeviceStatus(1);
  const step = stepper(getDeviceStatus(FixtureAPI, { deviceStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getDeviceStatus(FixtureAPI, { deviceStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllDeviceStatuses();
  const step = stepper(getAllDeviceStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllDeviceStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateDeviceStatus({ id: 1 });
  const step = stepper(updateDeviceStatus(FixtureAPI, { deviceStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateDeviceStatus(FixtureAPI, { deviceStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchDeviceStatuses();
  const step = stepper(searchDeviceStatuses(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchDeviceStatuses(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteDeviceStatus({ id: 1 });
  const step = stepper(deleteDeviceStatus(FixtureAPI, { deviceStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteDeviceStatus(FixtureAPI, { deviceStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceStatusActions.deviceStatusDeleteFailure()));
});
