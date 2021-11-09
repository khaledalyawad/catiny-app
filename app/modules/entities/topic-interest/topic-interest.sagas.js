import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import TopicInterestActions from './topic-interest.reducer';

function* getTopicInterest(api, action)
{
  const {topicInterestId} = action;
  // make the call to the api
  const apiCall = call(api.getTopicInterest, topicInterestId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TopicInterestActions.topicInterestSuccess(response.data));
  }
  else
  {
    yield put(TopicInterestActions.topicInterestFailure(response.data));
  }
}

function* getAllTopicInterests(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllTopicInterests, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TopicInterestActions.topicInterestAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(TopicInterestActions.topicInterestAllFailure(response.data));
  }
}

function* updateTopicInterest(api, action)
{
  const {topicInterest} = action;
  // make the call to the api
  const idIsNotNull = !(topicInterest.id === null || topicInterest.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateTopicInterest : api.createTopicInterest, topicInterest);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TopicInterestActions.topicInterestUpdateSuccess(response.data));
  }
  else
  {
    yield put(TopicInterestActions.topicInterestUpdateFailure(response.data));
  }
}

function* searchTopicInterests(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchTopicInterests, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TopicInterestActions.topicInterestSearchSuccess(response.data));
  }
  else
  {
    yield put(TopicInterestActions.topicInterestSearchFailure(response.data));
  }
}

function* deleteTopicInterest(api, action)
{
  const {topicInterestId} = action;
  // make the call to the api
  const apiCall = call(api.deleteTopicInterest, topicInterestId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TopicInterestActions.topicInterestDeleteSuccess());
  }
  else
  {
    yield put(TopicInterestActions.topicInterestDeleteFailure(response.data));
  }
}

export default {
  getAllTopicInterests,
  getTopicInterest,
  deleteTopicInterest,
  searchTopicInterests,
  updateTopicInterest,
};
