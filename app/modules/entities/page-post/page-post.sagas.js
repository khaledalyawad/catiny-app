import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import PagePostActions from './page-post.reducer';

function* getPagePost(api, action)
{
  const {pagePostId} = action;
  // make the call to the api
  const apiCall = call(api.getPagePost, pagePostId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PagePostActions.pagePostSuccess(response.data));
  }
  else
  {
    yield put(PagePostActions.pagePostFailure(response.data));
  }
}

function* getAllPagePosts(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllPagePosts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PagePostActions.pagePostAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(PagePostActions.pagePostAllFailure(response.data));
  }
}

function* updatePagePost(api, action)
{
  const {pagePost} = action;
  // make the call to the api
  const idIsNotNull = !(pagePost.id === null || pagePost.id === undefined);
  const apiCall = call(idIsNotNull ? api.updatePagePost : api.createPagePost, pagePost);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PagePostActions.pagePostUpdateSuccess(response.data));
  }
  else
  {
    yield put(PagePostActions.pagePostUpdateFailure(response.data));
  }
}

function* searchPagePosts(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchPagePosts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PagePostActions.pagePostSearchSuccess(response.data));
  }
  else
  {
    yield put(PagePostActions.pagePostSearchFailure(response.data));
  }
}

function* deletePagePost(api, action)
{
  const {pagePostId} = action;
  // make the call to the api
  const apiCall = call(api.deletePagePost, pagePostId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(PagePostActions.pagePostDeleteSuccess());
  }
  else
  {
    yield put(PagePostActions.pagePostDeleteFailure(response.data));
  }
}

export default {
  getAllPagePosts,
  getPagePost,
  deletePagePost,
  searchPagePosts,
  updatePagePost,
};
