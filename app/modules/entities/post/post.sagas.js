import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import PostActions from './post.reducer';

function* getPost(api, action)
{
  const {postId} = action;
  // make the call to the api
  const apiCall = call(api.getPost, postId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PostActions.postSuccess(response.data));
  }
  else
  {
    yield put(PostActions.postFailure(response.data));
  }
}

function* getAllPosts(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllPosts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PostActions.postAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(PostActions.postAllFailure(response.data));
  }
}

function* updatePost(api, action)
{
  const {post} = action;
  // make the call to the api
  const idIsNotNull = !(post.id === null || post.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePost : api.createPost, post);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PostActions.postUpdateSuccess(response.data));
  }
  else
  {
    yield put(PostActions.postUpdateFailure(response.data));
  }
}

function* searchPosts(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchPosts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PostActions.postSearchSuccess(response.data));
  }
  else
  {
    yield put(PostActions.postSearchFailure(response.data));
  }
}

function* deletePost(api, action)
{
  const {postId} = action;
  // make the call to the api
  const apiCall = call(api.deletePost, postId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PostActions.postDeleteSuccess());
  }
  else
  {
    yield put(PostActions.postDeleteFailure(response.data));
  }
}

export default {
  getAllPosts,
  getPost,
  deletePost,
  searchPosts,
  updatePost,
};
