import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import HistoryUpdateActions from './history-update.reducer';

function* getHistoryUpdate(api, action)
{
  const {historyUpdateId} = action;
  // make the call to the api
  const apiCall = call(api.getHistoryUpdate, historyUpdateId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(HistoryUpdateActions.historyUpdateSuccess(response.data));
  }
  else
  {
    yield put(HistoryUpdateActions.historyUpdateFailure(response.data));
  }
}

function* getAllHistoryUpdates(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllHistoryUpdates, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(HistoryUpdateActions.historyUpdateAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(HistoryUpdateActions.historyUpdateAllFailure(response.data));
  }
}

function* updateHistoryUpdate(api, action)
{
  const {historyUpdate} = action;
  // make the call to the api
  const idIsNotNull = !(historyUpdate.id === null || historyUpdate.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateHistoryUpdate : api.createHistoryUpdate, historyUpdate);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(HistoryUpdateActions.historyUpdateUpdateSuccess(response.data));
  }
  else
  {
    yield put(HistoryUpdateActions.historyUpdateUpdateFailure(response.data));
  }
}

function* searchHistoryUpdates(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchHistoryUpdates, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(HistoryUpdateActions.historyUpdateSearchSuccess(response.data));
  }
  else
  {
    yield put(HistoryUpdateActions.historyUpdateSearchFailure(response.data));
  }
}

function* deleteHistoryUpdate(api, action)
{
  const {historyUpdateId} = action;
  // make the call to the api
  const apiCall = call(api.deleteHistoryUpdate, historyUpdateId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(HistoryUpdateActions.historyUpdateDeleteSuccess());
  }
  else
  {
    yield put(HistoryUpdateActions.historyUpdateDeleteFailure(response.data));
  }
}

export default {
  getAllHistoryUpdates,
  getHistoryUpdate,
  deleteHistoryUpdate,
  searchHistoryUpdates,
  updateHistoryUpdate,
};
