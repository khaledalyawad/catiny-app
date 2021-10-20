import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BaseInfoActions from './base-info.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getBaseInfo(api, action) {
  const { baseInfoId } = action;
  // make the call to the api
  const apiCall = call(api.getBaseInfo, baseInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(BaseInfoActions.baseInfoSuccess(response.data));
  } else {
    yield put(BaseInfoActions.baseInfoFailure(response.data));
  }
}

function* getAllBaseInfos(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBaseInfos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BaseInfoActions.baseInfoAllSuccess(response.data, response.headers));
  } else {
    yield put(BaseInfoActions.baseInfoAllFailure(response.data));
  }
}

function* updateBaseInfo(api, action) {
  const { baseInfo } = action;
  // make the call to the api
  const idIsNotNull = !(baseInfo.id === null || baseInfo.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBaseInfo : api.createBaseInfo, baseInfo);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(BaseInfoActions.baseInfoUpdateSuccess(response.data));
  } else {
    yield put(BaseInfoActions.baseInfoUpdateFailure(response.data));
  }
}

function* searchBaseInfos(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchBaseInfos, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BaseInfoActions.baseInfoSearchSuccess(response.data));
  } else {
    yield put(BaseInfoActions.baseInfoSearchFailure(response.data));
  }
}
function* deleteBaseInfo(api, action) {
  const { baseInfoId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBaseInfo, baseInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BaseInfoActions.baseInfoDeleteSuccess());
  } else {
    yield put(BaseInfoActions.baseInfoDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.createdDate = convertDateTimeFromServer(data.createdDate);
  data.modifiedDate = convertDateTimeFromServer(data.modifiedDate);
  return data;
}

export default {
  getAllBaseInfos,
  getBaseInfo,
  deleteBaseInfo,
  searchBaseInfos,
  updateBaseInfo,
};
