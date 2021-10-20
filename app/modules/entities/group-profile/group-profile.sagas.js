import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import GroupProfileActions from './group-profile.reducer';

function* getGroupProfile(api, action) {
  const { groupProfileId } = action;
  // make the call to the api
  const apiCall = call(api.getGroupProfile, groupProfileId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(GroupProfileActions.groupProfileSuccess(response.data));
  } else {
    yield put(GroupProfileActions.groupProfileFailure(response.data));
  }
}

function* getAllGroupProfiles(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllGroupProfiles, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(GroupProfileActions.groupProfileAllSuccess(response.data, response.headers));
  } else {
    yield put(GroupProfileActions.groupProfileAllFailure(response.data));
  }
}

function* updateGroupProfile(api, action) {
  const { groupProfile } = action;
  // make the call to the api
  const idIsNotNull = !(groupProfile.id === null || groupProfile.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateGroupProfile : api.createGroupProfile, groupProfile);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(GroupProfileActions.groupProfileUpdateSuccess(response.data));
  } else {
    yield put(GroupProfileActions.groupProfileUpdateFailure(response.data));
  }
}

function* searchGroupProfiles(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchGroupProfiles, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(GroupProfileActions.groupProfileSearchSuccess(response.data));
  } else {
    yield put(GroupProfileActions.groupProfileSearchFailure(response.data));
  }
}
function* deleteGroupProfile(api, action) {
  const { groupProfileId } = action;
  // make the call to the api
  const apiCall = call(api.deleteGroupProfile, groupProfileId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(GroupProfileActions.groupProfileDeleteSuccess());
  } else {
    yield put(GroupProfileActions.groupProfileDeleteFailure(response.data));
  }
}

export default {
  getAllGroupProfiles,
  getGroupProfile,
  deleteGroupProfile,
  searchGroupProfiles,
  updateGroupProfile,
};
