import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import PageProfileActions from './page-profile.reducer';

function* getPageProfile(api, action) {
  const { pageProfileId } = action;
  // make the call to the api
  const apiCall = call(api.getPageProfile, pageProfileId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PageProfileActions.pageProfileSuccess(response.data));
  } else {
    yield put(PageProfileActions.pageProfileFailure(response.data));
  }
}

function* getAllPageProfiles(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllPageProfiles, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PageProfileActions.pageProfileAllSuccess(response.data, response.headers));
  } else {
    yield put(PageProfileActions.pageProfileAllFailure(response.data));
  }
}

function* updatePageProfile(api, action) {
  const { pageProfile } = action;
  // make the call to the api
  const idIsNotNull = !(pageProfile.id === null || pageProfile.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePageProfile : api.createPageProfile, pageProfile);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PageProfileActions.pageProfileUpdateSuccess(response.data));
  } else {
    yield put(PageProfileActions.pageProfileUpdateFailure(response.data));
  }
}

function* searchPageProfiles(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchPageProfiles, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PageProfileActions.pageProfileSearchSuccess(response.data));
  } else {
    yield put(PageProfileActions.pageProfileSearchFailure(response.data));
  }
}
function* deletePageProfile(api, action) {
  const { pageProfileId } = action;
  // make the call to the api
  const apiCall = call(api.deletePageProfile, pageProfileId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PageProfileActions.pageProfileDeleteSuccess());
  } else {
    yield put(PageProfileActions.pageProfileDeleteFailure(response.data));
  }
}

export default {
  getAllPageProfiles,
  getPageProfile,
  deletePageProfile,
  searchPageProfiles,
  updatePageProfile,
};
