import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import HanhChinhVNSagas from '../../../../../app/modules/entities/hanh-chinh-vn/hanh-chinh-vn.sagas';
import HanhChinhVNActions from '../../../../../app/modules/entities/hanh-chinh-vn/hanh-chinh-vn.reducer';

const { getHanhChinhVN, getAllHanhChinhVNS, updateHanhChinhVN, deleteHanhChinhVN, searchHanhChinhVNS } = HanhChinhVNSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getHanhChinhVN(1);
  const step = stepper(getHanhChinhVN(FixtureAPI, { hanhChinhVNId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getHanhChinhVN(FixtureAPI, { hanhChinhVNId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllHanhChinhVNS();
  const step = stepper(getAllHanhChinhVNS(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllHanhChinhVNS(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateHanhChinhVN({ id: 1 });
  const step = stepper(updateHanhChinhVN(FixtureAPI, { hanhChinhVN: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateHanhChinhVN(FixtureAPI, { hanhChinhVN: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchHanhChinhVNS();
  const step = stepper(searchHanhChinhVNS(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchHanhChinhVNS(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteHanhChinhVN({ id: 1 });
  const step = stepper(deleteHanhChinhVN(FixtureAPI, { hanhChinhVNId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteHanhChinhVN(FixtureAPI, { hanhChinhVNId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HanhChinhVNActions.hanhChinhVNDeleteFailure()));
});
