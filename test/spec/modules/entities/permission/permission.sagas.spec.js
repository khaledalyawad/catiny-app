import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PermissionSagas from '../../../../../app/modules/entities/permission/permission.sagas';
import PermissionActions from '../../../../../app/modules/entities/permission/permission.reducer';

const { getPermission, getAllPermissions, updatePermission, deletePermission, searchPermissions } = PermissionSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPermission(1);
  const step = stepper(getPermission(FixtureAPI, { permissionId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PermissionActions.permissionSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPermission(FixtureAPI, { permissionId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PermissionActions.permissionFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPermissions();
  const step = stepper(getAllPermissions(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PermissionActions.permissionAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPermissions(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PermissionActions.permissionAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePermission({ id: 1 });
  const step = stepper(updatePermission(FixtureAPI, { permission: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PermissionActions.permissionUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePermission(FixtureAPI, { permission: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PermissionActions.permissionUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPermissions();
  const step = stepper(searchPermissions(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PermissionActions.permissionSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPermissions(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PermissionActions.permissionSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePermission({ id: 1 });
  const step = stepper(deletePermission(FixtureAPI, { permissionId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PermissionActions.permissionDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePermission(FixtureAPI, { permissionId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PermissionActions.permissionDeleteFailure()));
});
