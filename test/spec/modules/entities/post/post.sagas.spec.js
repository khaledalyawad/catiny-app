import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PostSagas from '../../../../../app/modules/entities/post/post.sagas';
import PostActions from '../../../../../app/modules/entities/post/post.reducer';

const { getPost, getAllPosts, updatePost, deletePost, searchPosts } = PostSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPost(1);
  const step = stepper(getPost(FixtureAPI, { postId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostActions.postSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPost(FixtureAPI, { postId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostActions.postFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPosts();
  const step = stepper(getAllPosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostActions.postAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostActions.postAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePost({ id: 1 });
  const step = stepper(updatePost(FixtureAPI, { post: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostActions.postUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePost(FixtureAPI, { post: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostActions.postUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPosts();
  const step = stepper(searchPosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostActions.postSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostActions.postSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePost({ id: 1 });
  const step = stepper(deletePost(FixtureAPI, { postId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostActions.postDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePost(FixtureAPI, { postId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostActions.postDeleteFailure()));
});
