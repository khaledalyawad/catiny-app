import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MessageContentSagas from '../../../../../app/modules/entities/message-content/message-content.sagas';
import MessageContentActions from '../../../../../app/modules/entities/message-content/message-content.reducer';

const { getMessageContent, getAllMessageContents, updateMessageContent, deleteMessageContent, searchMessageContents } = MessageContentSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMessageContent(1);
  const step = stepper(getMessageContent(FixtureAPI, { messageContentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageContentActions.messageContentSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMessageContent(FixtureAPI, { messageContentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageContentActions.messageContentFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMessageContents();
  const step = stepper(getAllMessageContents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageContentActions.messageContentAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMessageContents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageContentActions.messageContentAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMessageContent({ id: 1 });
  const step = stepper(updateMessageContent(FixtureAPI, { messageContent: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageContentActions.messageContentUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMessageContent(FixtureAPI, { messageContent: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageContentActions.messageContentUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchMessageContents();
  const step = stepper(searchMessageContents(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageContentActions.messageContentSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchMessageContents(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageContentActions.messageContentSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteMessageContent({ id: 1 });
  const step = stepper(deleteMessageContent(FixtureAPI, { messageContentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageContentActions.messageContentDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMessageContent(FixtureAPI, { messageContentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageContentActions.messageContentDeleteFailure()));
});
