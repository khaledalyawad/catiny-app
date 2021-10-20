import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import GroupPostSagas from '../../../../../app/modules/entities/group-post/group-post.sagas';
import GroupPostActions from '../../../../../app/modules/entities/group-post/group-post.reducer';

const { getGroupPost, getAllGroupPosts, updateGroupPost, deleteGroupPost, searchGroupPosts } = GroupPostSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getGroupPost(1);
  const step = stepper(getGroupPost(FixtureAPI, { groupPostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupPostActions.groupPostSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getGroupPost(FixtureAPI, { groupPostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupPostActions.groupPostFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllGroupPosts();
  const step = stepper(getAllGroupPosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupPostActions.groupPostAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllGroupPosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupPostActions.groupPostAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateGroupPost({ id: 1 });
  const step = stepper(updateGroupPost(FixtureAPI, { groupPost: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupPostActions.groupPostUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateGroupPost(FixtureAPI, { groupPost: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupPostActions.groupPostUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchGroupPosts();
  const step = stepper(searchGroupPosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupPostActions.groupPostSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchGroupPosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupPostActions.groupPostSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteGroupPost({ id: 1 });
  const step = stepper(deleteGroupPost(FixtureAPI, { groupPostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(GroupPostActions.groupPostDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteGroupPost(FixtureAPI, { groupPostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(GroupPostActions.groupPostDeleteFailure()));
});
