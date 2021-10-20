import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ClassInfoSagas from '../../../../../app/modules/entities/class-info/class-info.sagas';
import ClassInfoActions from '../../../../../app/modules/entities/class-info/class-info.reducer';

const { getClassInfo, getAllClassInfos, updateClassInfo, deleteClassInfo, searchClassInfos } = ClassInfoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getClassInfo(1);
  const step = stepper(getClassInfo(FixtureAPI, { classInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getClassInfo(FixtureAPI, { classInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllClassInfos();
  const step = stepper(getAllClassInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllClassInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateClassInfo({ id: 1 });
  const step = stepper(updateClassInfo(FixtureAPI, { classInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateClassInfo(FixtureAPI, { classInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchClassInfos();
  const step = stepper(searchClassInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchClassInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteClassInfo({ id: 1 });
  const step = stepper(deleteClassInfo(FixtureAPI, { classInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteClassInfo(FixtureAPI, { classInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClassInfoActions.classInfoDeleteFailure()));
});
