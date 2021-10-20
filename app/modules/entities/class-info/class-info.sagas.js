import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ClassInfoActions from './class-info.reducer';

function* getClassInfo(api, action) {
  const { classInfoId } = action;
  // make the call to the api
  const apiCall = call(api.getClassInfo, classInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClassInfoActions.classInfoSuccess(response.data));
  } else {
    yield put(ClassInfoActions.classInfoFailure(response.data));
  }
}

function* getAllClassInfos(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllClassInfos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClassInfoActions.classInfoAllSuccess(response.data, response.headers));
  } else {
    yield put(ClassInfoActions.classInfoAllFailure(response.data));
  }
}

function* updateClassInfo(api, action) {
  const { classInfo } = action;
  // make the call to the api
  const idIsNotNull = !(classInfo.id === null || classInfo.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateClassInfo : api.createClassInfo, classInfo);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClassInfoActions.classInfoUpdateSuccess(response.data));
  } else {
    yield put(ClassInfoActions.classInfoUpdateFailure(response.data));
  }
}

function* searchClassInfos(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchClassInfos, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClassInfoActions.classInfoSearchSuccess(response.data));
  } else {
    yield put(ClassInfoActions.classInfoSearchFailure(response.data));
  }
}
function* deleteClassInfo(api, action) {
  const { classInfoId } = action;
  // make the call to the api
  const apiCall = call(api.deleteClassInfo, classInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClassInfoActions.classInfoDeleteSuccess());
  } else {
    yield put(ClassInfoActions.classInfoDeleteFailure(response.data));
  }
}

export default {
  getAllClassInfos,
  getClassInfo,
  deleteClassInfo,
  searchClassInfos,
  updateClassInfo,
};
