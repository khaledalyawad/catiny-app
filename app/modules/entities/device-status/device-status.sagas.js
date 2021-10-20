import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import DeviceStatusActions from './device-status.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getDeviceStatus(api, action) {
  const { deviceStatusId } = action;
  // make the call to the api
  const apiCall = call(api.getDeviceStatus, deviceStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(DeviceStatusActions.deviceStatusSuccess(response.data));
  } else {
    yield put(DeviceStatusActions.deviceStatusFailure(response.data));
  }
}

function* getAllDeviceStatuses(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllDeviceStatuses, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DeviceStatusActions.deviceStatusAllSuccess(response.data, response.headers));
  } else {
    yield put(DeviceStatusActions.deviceStatusAllFailure(response.data));
  }
}

function* updateDeviceStatus(api, action) {
  const { deviceStatus } = action;
  // make the call to the api
  const idIsNotNull = !(deviceStatus.id === null || deviceStatus.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateDeviceStatus : api.createDeviceStatus, deviceStatus);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(DeviceStatusActions.deviceStatusUpdateSuccess(response.data));
  } else {
    yield put(DeviceStatusActions.deviceStatusUpdateFailure(response.data));
  }
}

function* searchDeviceStatuses(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchDeviceStatuses, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DeviceStatusActions.deviceStatusSearchSuccess(response.data));
  } else {
    yield put(DeviceStatusActions.deviceStatusSearchFailure(response.data));
  }
}
function* deleteDeviceStatus(api, action) {
  const { deviceStatusId } = action;
  // make the call to the api
  const apiCall = call(api.deleteDeviceStatus, deviceStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DeviceStatusActions.deviceStatusDeleteSuccess());
  } else {
    yield put(DeviceStatusActions.deviceStatusDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.lastVisited = convertDateTimeFromServer(data.lastVisited);
  return data;
}

export default {
  getAllDeviceStatuses,
  getDeviceStatus,
  deleteDeviceStatus,
  searchDeviceStatuses,
  updateDeviceStatus,
};
