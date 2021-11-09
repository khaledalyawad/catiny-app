import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import FollowPageActions from './follow-page.reducer';

function* getFollowPage(api, action)
{
  const {followPageId} = action;
  // make the call to the api
  const apiCall = call(api.getFollowPage, followPageId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowPageActions.followPageSuccess(response.data));
  }
  else
  {
    yield put(FollowPageActions.followPageFailure(response.data));
  }
}

function* getAllFollowPages(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllFollowPages, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowPageActions.followPageAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(FollowPageActions.followPageAllFailure(response.data));
  }
}

function* updateFollowPage(api, action)
{
  const {followPage} = action;
  // make the call to the api
  const idIsNotNull = !(followPage.id === null || followPage.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFollowPage : api.createFollowPage, followPage);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowPageActions.followPageUpdateSuccess(response.data));
  }
  else
  {
    yield put(FollowPageActions.followPageUpdateFailure(response.data));
  }
}

function* searchFollowPages(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchFollowPages, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowPageActions.followPageSearchSuccess(response.data));
  }
  else
  {
    yield put(FollowPageActions.followPageSearchFailure(response.data));
  }
}

function* deleteFollowPage(api, action)
{
  const {followPageId} = action;
  // make the call to the api
  const apiCall = call(api.deleteFollowPage, followPageId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FollowPageActions.followPageDeleteSuccess());
  }
  else
  {
    yield put(FollowPageActions.followPageDeleteFailure(response.data));
  }
}

export default {
  getAllFollowPages,
  getFollowPage,
  deleteFollowPage,
  searchFollowPages,
  updateFollowPage,
};
