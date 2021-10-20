import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import MessageContentActions from './message-content.reducer';

function* getMessageContent(api, action) {
  const { messageContentId } = action;
  // make the call to the api
  const apiCall = call(api.getMessageContent, messageContentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MessageContentActions.messageContentSuccess(response.data));
  } else {
    yield put(MessageContentActions.messageContentFailure(response.data));
  }
}

function* getAllMessageContents(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllMessageContents, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MessageContentActions.messageContentAllSuccess(response.data, response.headers));
  } else {
    yield put(MessageContentActions.messageContentAllFailure(response.data));
  }
}

function* updateMessageContent(api, action) {
  const { messageContent } = action;
  // make the call to the api
  const idIsNotNull = !(messageContent.id === null || messageContent.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMessageContent : api.createMessageContent, messageContent);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MessageContentActions.messageContentUpdateSuccess(response.data));
  } else {
    yield put(MessageContentActions.messageContentUpdateFailure(response.data));
  }
}

function* searchMessageContents(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchMessageContents, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MessageContentActions.messageContentSearchSuccess(response.data));
  } else {
    yield put(MessageContentActions.messageContentSearchFailure(response.data));
  }
}
function* deleteMessageContent(api, action) {
  const { messageContentId } = action;
  // make the call to the api
  const apiCall = call(api.deleteMessageContent, messageContentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MessageContentActions.messageContentDeleteSuccess());
  } else {
    yield put(MessageContentActions.messageContentDeleteFailure(response.data));
  }
}

export default {
  getAllMessageContents,
  getMessageContent,
  deleteMessageContent,
  searchMessageContents,
  updateMessageContent,
};
