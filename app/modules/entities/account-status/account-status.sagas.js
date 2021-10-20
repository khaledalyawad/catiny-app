import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AccountStatusActions from './account-status.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getAccountStatus(api, action) {
  const { accountStatusId } = action;
  // make the call to the api
  const apiCall = call(api.getAccountStatus, accountStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AccountStatusActions.accountStatusSuccess(response.data));
  } else {
    yield put(AccountStatusActions.accountStatusFailure(response.data));
  }
}

function* getAllAccountStatuses(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAccountStatuses, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AccountStatusActions.accountStatusAllSuccess(response.data, response.headers));
  } else {
    yield put(AccountStatusActions.accountStatusAllFailure(response.data));
  }
}

function* updateAccountStatus(api, action) {
  const { accountStatus } = action;
  // make the call to the api
  const idIsNotNull = !(accountStatus.id === null || accountStatus.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAccountStatus : api.createAccountStatus, accountStatus);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AccountStatusActions.accountStatusUpdateSuccess(response.data));
  } else {
    yield put(AccountStatusActions.accountStatusUpdateFailure(response.data));
  }
}

function* searchAccountStatuses(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchAccountStatuses, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AccountStatusActions.accountStatusSearchSuccess(response.data));
  } else {
    yield put(AccountStatusActions.accountStatusSearchFailure(response.data));
  }
}
function* deleteAccountStatus(api, action) {
  const { accountStatusId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAccountStatus, accountStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AccountStatusActions.accountStatusDeleteSuccess());
  } else {
    yield put(AccountStatusActions.accountStatusDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.lastVisited = convertDateTimeFromServer(data.lastVisited);
  return data;
}

export default {
  getAllAccountStatuses,
  getAccountStatus,
  deleteAccountStatus,
  searchAccountStatuses,
  updateAccountStatus,
};
