import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import VideoStreamActions from './video-stream.reducer';

function* getVideoStream(api, action) {
  const { videoStreamId } = action;
  // make the call to the api
  const apiCall = call(api.getVideoStream, videoStreamId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoStreamActions.videoStreamSuccess(response.data));
  } else {
    yield put(VideoStreamActions.videoStreamFailure(response.data));
  }
}

function* getAllVideoStreams(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllVideoStreams, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoStreamActions.videoStreamAllSuccess(response.data, response.headers));
  } else {
    yield put(VideoStreamActions.videoStreamAllFailure(response.data));
  }
}

function* updateVideoStream(api, action) {
  const { videoStream } = action;
  // make the call to the api
  const idIsNotNull = !(videoStream.id === null || videoStream.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateVideoStream : api.createVideoStream, videoStream);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoStreamActions.videoStreamUpdateSuccess(response.data));
  } else {
    yield put(VideoStreamActions.videoStreamUpdateFailure(response.data));
  }
}

function* searchVideoStreams(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchVideoStreams, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoStreamActions.videoStreamSearchSuccess(response.data));
  } else {
    yield put(VideoStreamActions.videoStreamSearchFailure(response.data));
  }
}
function* deleteVideoStream(api, action) {
  const { videoStreamId } = action;
  // make the call to the api
  const apiCall = call(api.deleteVideoStream, videoStreamId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoStreamActions.videoStreamDeleteSuccess());
  } else {
    yield put(VideoStreamActions.videoStreamDeleteFailure(response.data));
  }
}

export default {
  getAllVideoStreams,
  getVideoStream,
  deleteVideoStream,
  searchVideoStreams,
  updateVideoStream,
};
