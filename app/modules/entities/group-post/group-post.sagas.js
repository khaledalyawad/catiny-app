import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import GroupPostActions from './group-post.reducer';

function* getGroupPost(api, action)
{
  const {groupPostId} = action;
  // make the call to the api
  const apiCall = call(api.getGroupPost, groupPostId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(GroupPostActions.groupPostSuccess(response.data));
  }
  else
  {
    yield put(GroupPostActions.groupPostFailure(response.data));
  }
}

function* getAllGroupPosts(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllGroupPosts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(GroupPostActions.groupPostAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(GroupPostActions.groupPostAllFailure(response.data));
  }
}

function* updateGroupPost(api, action)
{
  const {groupPost} = action;
  // make the call to the api
  const idIsNotNull = !(groupPost.id === null || groupPost.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateGroupPost : api.createGroupPost, groupPost);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(GroupPostActions.groupPostUpdateSuccess(response.data));
  }
  else
  {
    yield put(GroupPostActions.groupPostUpdateFailure(response.data));
  }
}

function* searchGroupPosts(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchGroupPosts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(GroupPostActions.groupPostSearchSuccess(response.data));
  }
  else
  {
    yield put(GroupPostActions.groupPostSearchFailure(response.data));
  }
}

function* deleteGroupPost(api, action)
{
  const {groupPostId} = action;
  // make the call to the api
  const apiCall = call(api.deleteGroupPost, groupPostId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(GroupPostActions.groupPostDeleteSuccess());
  }
  else
  {
    yield put(GroupPostActions.groupPostDeleteFailure(response.data));
  }
}

export default {
  getAllGroupPosts,
  getGroupPost,
  deleteGroupPost,
  searchGroupPosts,
  updateGroupPost,
};
