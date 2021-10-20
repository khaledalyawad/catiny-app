import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MessageGroupSagas from '../../../../../app/modules/entities/message-group/message-group.sagas';
import MessageGroupActions from '../../../../../app/modules/entities/message-group/message-group.reducer';

const { getMessageGroup, getAllMessageGroups, updateMessageGroup, deleteMessageGroup, searchMessageGroups } = MessageGroupSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMessageGroup(1);
  const step = stepper(getMessageGroup(FixtureAPI, { messageGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMessageGroup(FixtureAPI, { messageGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMessageGroups();
  const step = stepper(getAllMessageGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMessageGroups(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMessageGroup({ id: 1 });
  const step = stepper(updateMessageGroup(FixtureAPI, { messageGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMessageGroup(FixtureAPI, { messageGroup: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchMessageGroups();
  const step = stepper(searchMessageGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchMessageGroups(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteMessageGroup({ id: 1 });
  const step = stepper(deleteMessageGroup(FixtureAPI, { messageGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMessageGroup(FixtureAPI, { messageGroupId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageGroupActions.messageGroupDeleteFailure()));
});
