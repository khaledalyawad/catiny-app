import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import VideoSagas from '../../../../../app/modules/entities/video/video.sagas';
import VideoActions from '../../../../../app/modules/entities/video/video.reducer';

const { getVideo, getAllVideos, updateVideo, deleteVideo, searchVideos } = VideoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getVideo(1);
  const step = stepper(getVideo(FixtureAPI, { videoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoActions.videoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getVideo(FixtureAPI, { videoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoActions.videoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllVideos();
  const step = stepper(getAllVideos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoActions.videoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllVideos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoActions.videoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateVideo({ id: 1 });
  const step = stepper(updateVideo(FixtureAPI, { video: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoActions.videoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateVideo(FixtureAPI, { video: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoActions.videoUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchVideos();
  const step = stepper(searchVideos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoActions.videoSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchVideos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoActions.videoSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteVideo({ id: 1 });
  const step = stepper(deleteVideo(FixtureAPI, { videoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VideoActions.videoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteVideo(FixtureAPI, { videoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VideoActions.videoDeleteFailure()));
});
