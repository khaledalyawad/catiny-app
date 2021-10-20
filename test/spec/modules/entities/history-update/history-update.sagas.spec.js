import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import HistoryUpdateSagas from '../../../../../app/modules/entities/history-update/history-update.sagas';
import HistoryUpdateActions from '../../../../../app/modules/entities/history-update/history-update.reducer';

const { getHistoryUpdate, getAllHistoryUpdates, updateHistoryUpdate, deleteHistoryUpdate, searchHistoryUpdates } = HistoryUpdateSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getHistoryUpdate(1);
  const step = stepper(getHistoryUpdate(FixtureAPI, { historyUpdateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getHistoryUpdate(FixtureAPI, { historyUpdateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllHistoryUpdates();
  const step = stepper(getAllHistoryUpdates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllHistoryUpdates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateHistoryUpdate({ id: 1 });
  const step = stepper(updateHistoryUpdate(FixtureAPI, { historyUpdate: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateHistoryUpdate(FixtureAPI, { historyUpdate: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchHistoryUpdates();
  const step = stepper(searchHistoryUpdates(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchHistoryUpdates(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteHistoryUpdate({ id: 1 });
  const step = stepper(deleteHistoryUpdate(FixtureAPI, { historyUpdateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteHistoryUpdate(FixtureAPI, { historyUpdateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryUpdateActions.historyUpdateDeleteFailure()));
});
