import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import PostCommentActions from './post-comment.reducer';

function* getPostComment(api, action) {
  const { postCommentId } = action;
  // make the call to the api
  const apiCall = call(api.getPostComment, postCommentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostCommentActions.postCommentSuccess(response.data));
  } else {
    yield put(PostCommentActions.postCommentFailure(response.data));
  }
}

function* getAllPostComments(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllPostComments, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostCommentActions.postCommentAllSuccess(response.data, response.headers));
  } else {
    yield put(PostCommentActions.postCommentAllFailure(response.data));
  }
}

function* updatePostComment(api, action) {
  const { postComment } = action;
  // make the call to the api
  const idIsNotNull = !(postComment.id === null || postComment.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePostComment : api.createPostComment, postComment);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostCommentActions.postCommentUpdateSuccess(response.data));
  } else {
    yield put(PostCommentActions.postCommentUpdateFailure(response.data));
  }
}

function* searchPostComments(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchPostComments, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostCommentActions.postCommentSearchSuccess(response.data));
  } else {
    yield put(PostCommentActions.postCommentSearchFailure(response.data));
  }
}
function* deletePostComment(api, action) {
  const { postCommentId } = action;
  // make the call to the api
  const apiCall = call(api.deletePostComment, postCommentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(PostCommentActions.postCommentDeleteSuccess());
  } else {
    yield put(PostCommentActions.postCommentDeleteFailure(response.data));
  }
}

export default {
  getAllPostComments,
  getPostComment,
  deletePostComment,
  searchPostComments,
  updatePostComment,
};
