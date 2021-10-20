import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import FollowUserActions from './follow-user.reducer';

function* getFollowUser(api, action) {
  const { followUserId } = action;
  // make the call to the api
  const apiCall = call(api.getFollowUser, followUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FollowUserActions.followUserSuccess(response.data));
  } else {
    yield put(FollowUserActions.followUserFailure(response.data));
  }
}

function* getAllFollowUsers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllFollowUsers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FollowUserActions.followUserAllSuccess(response.data, response.headers));
  } else {
    yield put(FollowUserActions.followUserAllFailure(response.data));
  }
}

function* updateFollowUser(api, action) {
  const { followUser } = action;
  // make the call to the api
  const idIsNotNull = !(followUser.id === null || followUser.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFollowUser : api.createFollowUser, followUser);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FollowUserActions.followUserUpdateSuccess(response.data));
  } else {
    yield put(FollowUserActions.followUserUpdateFailure(response.data));
  }
}

function* searchFollowUsers(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchFollowUsers, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FollowUserActions.followUserSearchSuccess(response.data));
  } else {
    yield put(FollowUserActions.followUserSearchFailure(response.data));
  }
}
function* deleteFollowUser(api, action) {
  const { followUserId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFollowUser, followUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FollowUserActions.followUserDeleteSuccess());
  } else {
    yield put(FollowUserActions.followUserDeleteFailure(response.data));
  }
}

export default {
  getAllFollowUsers,
  getFollowUser,
  deleteFollowUser,
  searchFollowUsers,
  updateFollowUser,
};
