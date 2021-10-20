import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import VideoStreamSagas from '../../../../../app/modules/entities/video-stream/video-stream.sagas';
import VideoStreamActions from '../../../../../app/modules/entities/video-stream/video-stream.reducer';

const { getVideoStream, getAllVideoStreams, updateVideoStream, deleteVideoStream, searchVideoStreams } = VideoStreamSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getVideoStream(1);
  const step = stepper(getVideoStream(FixtureAPI, { videoStreamId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getVideoStream(FixtureAPI, { videoStreamId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllVideoStreams();
  const step = stepper(getAllVideoStreams(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllVideoStreams(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateVideoStream({ id: 1 });
  const step = stepper(updateVideoStream(FixtureAPI, { videoStream: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateVideoStream(FixtureAPI, { videoStream: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchVideoStreams();
  const step = stepper(searchVideoStreams(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchVideoStreams(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteVideoStream({ id: 1 });
  const step = stepper(deleteVideoStream(FixtureAPI, { videoStreamId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteVideoStream(FixtureAPI, { videoStreamId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoStreamActions.videoStreamDeleteFailure()));
});
