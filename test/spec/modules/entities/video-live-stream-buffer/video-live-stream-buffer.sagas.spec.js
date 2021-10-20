import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import VideoLiveStreamBufferSagas from '../../../../../app/modules/entities/video-live-stream-buffer/video-live-stream-buffer.sagas';
import VideoLiveStreamBufferActions from '../../../../../app/modules/entities/video-live-stream-buffer/video-live-stream-buffer.reducer';

const {
  getVideoLiveStreamBuffer,
  getAllVideoLiveStreamBuffers,
  updateVideoLiveStreamBuffer,
  deleteVideoLiveStreamBuffer,
  searchVideoLiveStreamBuffers,
} = VideoLiveStreamBufferSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getVideoLiveStreamBuffer(1);
  const step = stepper(getVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBufferId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBufferId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllVideoLiveStreamBuffers();
  const step = stepper(getAllVideoLiveStreamBuffers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllVideoLiveStreamBuffers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateVideoLiveStreamBuffer({ id: 1 });
  const step = stepper(updateVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBuffer: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBuffer: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchVideoLiveStreamBuffers();
  const step = stepper(searchVideoLiveStreamBuffers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchVideoLiveStreamBuffers(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteVideoLiveStreamBuffer({ id: 1 });
  const step = stepper(deleteVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBufferId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteVideoLiveStreamBuffer(FixtureAPI, { videoLiveStreamBufferId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteFailure()));
});
