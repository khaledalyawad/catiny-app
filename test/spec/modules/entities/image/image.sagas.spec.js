import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ImageSagas from '../../../../../app/modules/entities/image/image.sagas';
import ImageActions from '../../../../../app/modules/entities/image/image.reducer';

const { getImage, getAllImages, updateImage, deleteImage, searchImages } = ImageSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getImage(1);
  const step = stepper(getImage(FixtureAPI, { imageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ImageActions.imageSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getImage(FixtureAPI, { imageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ImageActions.imageFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllImages();
  const step = stepper(getAllImages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ImageActions.imageAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllImages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ImageActions.imageAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateImage({ id: 1 });
  const step = stepper(updateImage(FixtureAPI, { image: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ImageActions.imageUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateImage(FixtureAPI, { image: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ImageActions.imageUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchImages();
  const step = stepper(searchImages(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ImageActions.imageSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchImages(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ImageActions.imageSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteImage({ id: 1 });
  const step = stepper(deleteImage(FixtureAPI, { imageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ImageActions.imageDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteImage(FixtureAPI, { imageId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ImageActions.imageDeleteFailure()));
});
