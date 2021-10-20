import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import BaseInfoSagas from '../../../../../app/modules/entities/base-info/base-info.sagas';
import BaseInfoActions from '../../../../../app/modules/entities/base-info/base-info.reducer';

const { getBaseInfo, getAllBaseInfos, updateBaseInfo, deleteBaseInfo, searchBaseInfos } = BaseInfoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getBaseInfo(1);
  const step = stepper(getBaseInfo(FixtureAPI, { baseInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getBaseInfo(FixtureAPI, { baseInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllBaseInfos();
  const step = stepper(getAllBaseInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllBaseInfos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateBaseInfo({ id: 1 });
  const step = stepper(updateBaseInfo(FixtureAPI, { baseInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateBaseInfo(FixtureAPI, { baseInfo: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchBaseInfos();
  const step = stepper(searchBaseInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchBaseInfos(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteBaseInfo({ id: 1 });
  const step = stepper(deleteBaseInfo(FixtureAPI, { baseInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteBaseInfo(FixtureAPI, { baseInfoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BaseInfoActions.baseInfoDeleteFailure()));
});
