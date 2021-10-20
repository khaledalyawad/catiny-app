import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import VideoLiveStreamBufferActions from './video-live-stream-buffer.reducer';

function* getVideoLiveStreamBuffer(api, action) {
  const { videoLiveStreamBufferId } = action;
  // make the call to the api
  const apiCall = call(api.getVideoLiveStreamBuffer, videoLiveStreamBufferId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferSuccess(response.data));
  } else {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferFailure(response.data));
  }
}

function* getAllVideoLiveStreamBuffers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllVideoLiveStreamBuffers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferAllSuccess(response.data, response.headers));
  } else {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferAllFailure(response.data));
  }
}

function* updateVideoLiveStreamBuffer(api, action) {
  const { videoLiveStreamBuffer } = action;
  // make the call to the api
  const idIsNotNull = !(videoLiveStreamBuffer.id === null || videoLiveStreamBuffer.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateVideoLiveStreamBuffer : api.createVideoLiveStreamBuffer, videoLiveStreamBuffer);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferUpdateSuccess(response.data));
  } else {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferUpdateFailure(response.data));
  }
}

function* searchVideoLiveStreamBuffers(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchVideoLiveStreamBuffers, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferSearchSuccess(response.data));
  } else {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferSearchFailure(response.data));
  }
}
function* deleteVideoLiveStreamBuffer(api, action) {
  const { videoLiveStreamBufferId } = action;
  // make the call to the api
  const apiCall = call(api.deleteVideoLiveStreamBuffer, videoLiveStreamBufferId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteSuccess());
  } else {
    yield put(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteFailure(response.data));
  }
}

export default {
  getAllVideoLiveStreamBuffers,
  getVideoLiveStreamBuffer,
  deleteVideoLiveStreamBuffer,
  searchVideoLiveStreamBuffers,
  updateVideoLiveStreamBuffer,
};
