import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import MessageGroupActions from './message-group.reducer';

function* getMessageGroup(api, action)
{
  const {messageGroupId} = action;
  // make the call to the api
  const apiCall = call(api.getMessageGroup, messageGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(MessageGroupActions.messageGroupSuccess(response.data));
  }
  else
  {
    yield put(MessageGroupActions.messageGroupFailure(response.data));
  }
}

function* getAllMessageGroups(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllMessageGroups, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(MessageGroupActions.messageGroupAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(MessageGroupActions.messageGroupAllFailure(response.data));
  }
}

function* updateMessageGroup(api, action)
{
  const {messageGroup} = action;
  // make the call to the api
  const idIsNotNull = !(messageGroup.id === null || messageGroup.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMessageGroup : api.createMessageGroup, messageGroup);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(MessageGroupActions.messageGroupUpdateSuccess(response.data));
  }
  else
  {
    yield put(MessageGroupActions.messageGroupUpdateFailure(response.data));
  }
}

function* searchMessageGroups(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchMessageGroups, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(MessageGroupActions.messageGroupSearchSuccess(response.data));
  }
  else
  {
    yield put(MessageGroupActions.messageGroupSearchFailure(response.data));
  }
}

function* deleteMessageGroup(api, action)
{
  const {messageGroupId} = action;
  // make the call to the api
  const apiCall = call(api.deleteMessageGroup, messageGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(MessageGroupActions.messageGroupDeleteSuccess());
  }
  else
  {
    yield put(MessageGroupActions.messageGroupDeleteFailure(response.data));
  }
}

export default {
  getAllMessageGroups,
  getMessageGroup,
  deleteMessageGroup,
  searchMessageGroups,
  updateMessageGroup,
};
