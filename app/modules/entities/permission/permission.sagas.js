import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import PermissionActions from './permission.reducer';

function* getPermission(api, action)
{
  const {permissionId} = action;
  // make the call to the api
  const apiCall = call(api.getPermission, permissionId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PermissionActions.permissionSuccess(response.data));
  }
  else
  {
    yield put(PermissionActions.permissionFailure(response.data));
  }
}

function* getAllPermissions(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllPermissions, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PermissionActions.permissionAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(PermissionActions.permissionAllFailure(response.data));
  }
}

function* updatePermission(api, action)
{
  const {permission} = action;
  // make the call to the api
  const idIsNotNull = !(permission.id === null || permission.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePermission : api.createPermission, permission);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PermissionActions.permissionUpdateSuccess(response.data));
  }
  else
  {
    yield put(PermissionActions.permissionUpdateFailure(response.data));
  }
}

function* searchPermissions(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchPermissions, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PermissionActions.permissionSearchSuccess(response.data));
  }
  else
  {
    yield put(PermissionActions.permissionSearchFailure(response.data));
  }
}

function* deletePermission(api, action)
{
  const {permissionId} = action;
  // make the call to the api
  const apiCall = call(api.deletePermission, permissionId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PermissionActions.permissionDeleteSuccess());
  }
  else
  {
    yield put(PermissionActions.permissionDeleteFailure(response.data));
  }
}

export default {
  getAllPermissions,
  getPermission,
  deletePermission,
  searchPermissions,
  updatePermission,
};
