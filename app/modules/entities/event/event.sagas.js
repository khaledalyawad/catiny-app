import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import EventActions from './event.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getEvent(api, action) {
  const { eventId } = action;
  // make the call to the api
  const apiCall = call(api.getEvent, eventId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(EventActions.eventSuccess(response.data));
  } else {
    yield put(EventActions.eventFailure(response.data));
  }
}

function* getAllEvents(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllEvents, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(EventActions.eventAllSuccess(response.data, response.headers));
  } else {
    yield put(EventActions.eventAllFailure(response.data));
  }
}

function* updateEvent(api, action) {
  const { event } = action;
  // make the call to the api
  const idIsNotNull = !(event.id === null || event.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateEvent : api.createEvent, event);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(EventActions.eventUpdateSuccess(response.data));
  } else {
    yield put(EventActions.eventUpdateFailure(response.data));
  }
}

function* searchEvents(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchEvents, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(EventActions.eventSearchSuccess(response.data));
  } else {
    yield put(EventActions.eventSearchFailure(response.data));
  }
}
function* deleteEvent(api, action) {
  const { eventId } = action;
  // make the call to the api
  const apiCall = call(api.deleteEvent, eventId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(EventActions.eventDeleteSuccess());
  } else {
    yield put(EventActions.eventDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.startTime = convertDateTimeFromServer(data.startTime);
  data.endTime = convertDateTimeFromServer(data.endTime);
  return data;
}

export default {
  getAllEvents,
  getEvent,
  deleteEvent,
  searchEvents,
  updateEvent,
};
