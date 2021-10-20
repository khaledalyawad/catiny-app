import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import RankUserActions from './rank-user.reducer';

function* getRankUser(api, action) {
  const { rankUserId } = action;
  // make the call to the api
  const apiCall = call(api.getRankUser, rankUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RankUserActions.rankUserSuccess(response.data));
  } else {
    yield put(RankUserActions.rankUserFailure(response.data));
  }
}

function* getAllRankUsers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllRankUsers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RankUserActions.rankUserAllSuccess(response.data, response.headers));
  } else {
    yield put(RankUserActions.rankUserAllFailure(response.data));
  }
}

function* updateRankUser(api, action) {
  const { rankUser } = action;
  // make the call to the api
  const idIsNotNull = !(rankUser.id === null || rankUser.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateRankUser : api.createRankUser, rankUser);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RankUserActions.rankUserUpdateSuccess(response.data));
  } else {
    yield put(RankUserActions.rankUserUpdateFailure(response.data));
  }
}

function* searchRankUsers(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchRankUsers, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RankUserActions.rankUserSearchSuccess(response.data));
  } else {
    yield put(RankUserActions.rankUserSearchFailure(response.data));
  }
}
function* deleteRankUser(api, action) {
  const { rankUserId } = action;
  // make the call to the api
  const apiCall = call(api.deleteRankUser, rankUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RankUserActions.rankUserDeleteSuccess());
  } else {
    yield put(RankUserActions.rankUserDeleteFailure(response.data));
  }
}

export default {
  getAllRankUsers,
  getRankUser,
  deleteRankUser,
  searchRankUsers,
  updateRankUser,
};
