import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import HanhChinhVNActions from './hanh-chinh-vn.reducer';

function* getHanhChinhVN(api, action) {
  const { hanhChinhVNId } = action;
  // make the call to the api
  const apiCall = call(api.getHanhChinhVN, hanhChinhVNId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HanhChinhVNActions.hanhChinhVNSuccess(response.data));
  } else {
    yield put(HanhChinhVNActions.hanhChinhVNFailure(response.data));
  }
}

function* getAllHanhChinhVNS(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllHanhChinhVNS, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HanhChinhVNActions.hanhChinhVNAllSuccess(response.data, response.headers));
  } else {
    yield put(HanhChinhVNActions.hanhChinhVNAllFailure(response.data));
  }
}

function* updateHanhChinhVN(api, action) {
  const { hanhChinhVN } = action;
  // make the call to the api
  const idIsNotNull = !(hanhChinhVN.id === null || hanhChinhVN.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateHanhChinhVN : api.createHanhChinhVN, hanhChinhVN);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HanhChinhVNActions.hanhChinhVNUpdateSuccess(response.data));
  } else {
    yield put(HanhChinhVNActions.hanhChinhVNUpdateFailure(response.data));
  }
}

function* searchHanhChinhVNS(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchHanhChinhVNS, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HanhChinhVNActions.hanhChinhVNSearchSuccess(response.data));
  } else {
    yield put(HanhChinhVNActions.hanhChinhVNSearchFailure(response.data));
  }
}
function* deleteHanhChinhVN(api, action) {
  const { hanhChinhVNId } = action;
  // make the call to the api
  const apiCall = call(api.deleteHanhChinhVN, hanhChinhVNId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HanhChinhVNActions.hanhChinhVNDeleteSuccess());
  } else {
    yield put(HanhChinhVNActions.hanhChinhVNDeleteFailure(response.data));
  }
}

export default {
  getAllHanhChinhVNS,
  getHanhChinhVN,
  deleteHanhChinhVN,
  searchHanhChinhVNS,
  updateHanhChinhVN,
};
