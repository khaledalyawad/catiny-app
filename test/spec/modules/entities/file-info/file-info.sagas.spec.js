import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FileInfoSagas from '../../../../../app/modules/entities/file-info/file-info.sagas';
import FileInfoActions from '../../../../../app/modules/entities/file-info/file-info.reducer';

const { getFileInfo, getAllFileInfos, updateFileInfo, deleteFileInfo, searchFileInfos } = FileInfoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFileInfo(1);
  const step = stepper(getFileInfo(FixtureAPI, { fileInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFileInfo(FixtureAPI, { fileInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFileInfos();
  const step = stepper(getAllFileInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFileInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFileInfo({ id: 1 });
  const step = stepper(updateFileInfo(FixtureAPI, { fileInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFileInfo(FixtureAPI, { fileInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchFileInfos();
  const step = stepper(searchFileInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchFileInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteFileInfo({ id: 1 });
  const step = stepper(deleteFileInfo(FixtureAPI, { fileInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFileInfo(FixtureAPI, { fileInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FileInfoActions.fileInfoDeleteFailure()));
});
