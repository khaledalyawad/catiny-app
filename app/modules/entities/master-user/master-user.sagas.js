import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import MasterUserActions from './master-user.reducer';

function* getMasterUser(api, action) {
  const { masterUserId } = action;
  // make the call to the api
  const apiCall = call(api.getMasterUser, masterUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MasterUserActions.masterUserSuccess(response.data));
  } else {
    yield put(MasterUserActions.masterUserFailure(response.data));
  }
}

function* getAllMasterUsers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllMasterUsers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MasterUserActions.masterUserAllSuccess(response.data, response.headers));
  } else {
    yield put(MasterUserActions.masterUserAllFailure(response.data));
  }
}

function* updateMasterUser(api, action) {
  const { masterUser } = action;
  // make the call to the api
  const idIsNotNull = !(masterUser.id === null || masterUser.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMasterUser : api.createMasterUser, masterUser);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MasterUserActions.masterUserUpdateSuccess(response.data));
  } else {
    yield put(MasterUserActions.masterUserUpdateFailure(response.data));
  }
}

function* searchMasterUsers(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchMasterUsers, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MasterUserActions.masterUserSearchSuccess(response.data));
  } else {
    yield put(MasterUserActions.masterUserSearchFailure(response.data));
  }
}
function* deleteMasterUser(api, action) {
  const { masterUserId } = action;
  // make the call to the api
  const apiCall = call(api.deleteMasterUser, masterUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MasterUserActions.masterUserDeleteSuccess());
  } else {
    yield put(MasterUserActions.masterUserDeleteFailure(response.data));
  }
}

export default {
  getAllMasterUsers,
  getMasterUser,
  deleteMasterUser,
  searchMasterUsers,
  updateMasterUser,
};
