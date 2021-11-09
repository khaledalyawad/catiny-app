import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import FollowGroupActions from './follow-group.reducer';

function* getFollowGroup(api, action)
{
  const {followGroupId} = action;
  // make the call to the api
  const apiCall = call(api.getFollowGroup, followGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowGroupActions.followGroupSuccess(response.data));
  }
  else
  {
    yield put(FollowGroupActions.followGroupFailure(response.data));
  }
}

function* getAllFollowGroups(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllFollowGroups, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowGroupActions.followGroupAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(FollowGroupActions.followGroupAllFailure(response.data));
  }
}

function* updateFollowGroup(api, action)
{
  const {followGroup} = action;
  // make the call to the api
  const idIsNotNull = !(followGroup.id === null || followGroup.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFollowGroup : api.createFollowGroup, followGroup);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowGroupActions.followGroupUpdateSuccess(response.data));
  }
  else
  {
    yield put(FollowGroupActions.followGroupUpdateFailure(response.data));
  }
}

function* searchFollowGroups(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchFollowGroups, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowGroupActions.followGroupSearchSuccess(response.data));
  }
  else
  {
    yield put(FollowGroupActions.followGroupSearchFailure(response.data));
  }
}

function* deleteFollowGroup(api, action)
{
  const {followGroupId} = action;
  // make the call to the api
  const apiCall = call(api.deleteFollowGroup, followGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowGroupActions.followGroupDeleteSuccess());
  }
  else
  {
    yield put(FollowGroupActions.followGroupDeleteFailure(response.data));
  }
}

export default {
  getAllFollowGroups,
  getFollowGroup,
  deleteFollowGroup,
  searchFollowGroups,
  updateFollowGroup,
};
