import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import FriendActions from './friend.reducer';

function* getFriend(api, action) {
  const { friendId } = action;
  // make the call to the api
  const apiCall = call(api.getFriend, friendId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FriendActions.friendSuccess(response.data));
  } else {
    yield put(FriendActions.friendFailure(response.data));
  }
}

function* getAllFriends(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllFriends, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FriendActions.friendAllSuccess(response.data, response.headers));
  } else {
    yield put(FriendActions.friendAllFailure(response.data));
  }
}

function* updateFriend(api, action) {
  const { friend } = action;
  // make the call to the api
  const idIsNotNull = !(friend.id === null || friend.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFriend : api.createFriend, friend);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FriendActions.friendUpdateSuccess(response.data));
  } else {
    yield put(FriendActions.friendUpdateFailure(response.data));
  }
}

function* searchFriends(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchFriends, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FriendActions.friendSearchSuccess(response.data));
  } else {
    yield put(FriendActions.friendSearchFailure(response.data));
  }
}
function* deleteFriend(api, action) {
  const { friendId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFriend, friendId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FriendActions.friendDeleteSuccess());
  } else {
    yield put(FriendActions.friendDeleteFailure(response.data));
  }
}

export default {
  getAllFriends,
  getFriend,
  deleteFriend,
  searchFriends,
  updateFriend,
};
