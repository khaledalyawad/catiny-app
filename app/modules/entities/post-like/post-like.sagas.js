import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import PostLikeActions from './post-like.reducer';

function* getPostLike(api, action) {
  const { postLikeId } = action;
  // make the call to the api
  const apiCall = call(api.getPostLike, postLikeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostLikeActions.postLikeSuccess(response.data));
  } else {
    yield put(PostLikeActions.postLikeFailure(response.data));
  }
}

function* getAllPostLikes(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllPostLikes, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostLikeActions.postLikeAllSuccess(response.data, response.headers));
  } else {
    yield put(PostLikeActions.postLikeAllFailure(response.data));
  }
}

function* updatePostLike(api, action) {
  const { postLike } = action;
  // make the call to the api
  const idIsNotNull = !(postLike.id === null || postLike.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePostLike : api.createPostLike, postLike);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostLikeActions.postLikeUpdateSuccess(response.data));
  } else {
    yield put(PostLikeActions.postLikeUpdateFailure(response.data));
  }
}

function* searchPostLikes(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchPostLikes, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostLikeActions.postLikeSearchSuccess(response.data));
  } else {
    yield put(PostLikeActions.postLikeSearchFailure(response.data));
  }
}
function* deletePostLike(api, action) {
  const { postLikeId } = action;
  // make the call to the api
  const apiCall = call(api.deletePostLike, postLikeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostLikeActions.postLikeDeleteSuccess());
  } else {
    yield put(PostLikeActions.postLikeDeleteFailure(response.data));
  }
}

export default {
  getAllPostLikes,
  getPostLike,
  deletePostLike,
  searchPostLikes,
  updatePostLike,
};
