import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import VideoActions from './video.reducer';

function* getVideo(api, action)
{
  const {videoId} = action;
  // make the call to the api
  const apiCall = call(api.getVideo, videoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(VideoActions.videoSuccess(response.data));
  }
  else
  {
    yield put(VideoActions.videoFailure(response.data));
  }
}

function* getAllVideos(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllVideos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(VideoActions.videoAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(VideoActions.videoAllFailure(response.data));
  }
}

function* updateVideo(api, action)
{
  const {video} = action;
  // make the call to the api
  const idIsNotNull = !(video.id === null || video.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateVideo : api.createVideo, video);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(VideoActions.videoUpdateSuccess(response.data));
  }
  else
  {
    yield put(VideoActions.videoUpdateFailure(response.data));
  }
}

function* searchVideos(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchVideos, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(VideoActions.videoSearchSuccess(response.data));
  }
  else
  {
    yield put(VideoActions.videoSearchFailure(response.data));
  }
}

function* deleteVideo(api, action)
{
  const {videoId} = action;
  // make the call to the api
  const apiCall = call(api.deleteVideo, videoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(VideoActions.videoDeleteSuccess());
  }
  else
  {
    yield put(VideoActions.videoDeleteFailure(response.data));
  }
}

export default {
  getAllVideos,
  getVideo,
  deleteVideo,
  searchVideos,
  updateVideo,
};
