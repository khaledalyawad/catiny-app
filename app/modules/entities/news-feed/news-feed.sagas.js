import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import NewsFeedActions from './news-feed.reducer';

function* getNewsFeed(api, action) {
  const { newsFeedId } = action;
  // make the call to the api
  const apiCall = call(api.getNewsFeed, newsFeedId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NewsFeedActions.newsFeedSuccess(response.data));
  } else {
    yield put(NewsFeedActions.newsFeedFailure(response.data));
  }
}

function* getAllNewsFeeds(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllNewsFeeds, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NewsFeedActions.newsFeedAllSuccess(response.data, response.headers));
  } else {
    yield put(NewsFeedActions.newsFeedAllFailure(response.data));
  }
}

function* updateNewsFeed(api, action) {
  const { newsFeed } = action;
  // make the call to the api
  const idIsNotNull = !(newsFeed.id === null || newsFeed.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateNewsFeed : api.createNewsFeed, newsFeed);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NewsFeedActions.newsFeedUpdateSuccess(response.data));
  } else {
    yield put(NewsFeedActions.newsFeedUpdateFailure(response.data));
  }
}

function* searchNewsFeeds(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchNewsFeeds, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NewsFeedActions.newsFeedSearchSuccess(response.data));
  } else {
    yield put(NewsFeedActions.newsFeedSearchFailure(response.data));
  }
}
function* deleteNewsFeed(api, action) {
  const { newsFeedId } = action;
  // make the call to the api
  const apiCall = call(api.deleteNewsFeed, newsFeedId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NewsFeedActions.newsFeedDeleteSuccess());
  } else {
    yield put(NewsFeedActions.newsFeedDeleteFailure(response.data));
  }
}

export default {
  getAllNewsFeeds,
  getNewsFeed,
  deleteNewsFeed,
  searchNewsFeeds,
  updateNewsFeed,
};
