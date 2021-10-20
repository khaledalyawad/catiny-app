import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PostLikeSagas from '../../../../../app/modules/entities/post-like/post-like.sagas';
import PostLikeActions from '../../../../../app/modules/entities/post-like/post-like.reducer';

const { getPostLike, getAllPostLikes, updatePostLike, deletePostLike, searchPostLikes } = PostLikeSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPostLike(1);
  const step = stepper(getPostLike(FixtureAPI, { postLikeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostLikeActions.postLikeSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPostLike(FixtureAPI, { postLikeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostLikeActions.postLikeFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPostLikes();
  const step = stepper(getAllPostLikes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostLikeActions.postLikeAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPostLikes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostLikeActions.postLikeAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePostLike({ id: 1 });
  const step = stepper(updatePostLike(FixtureAPI, { postLike: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostLikeActions.postLikeUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePostLike(FixtureAPI, { postLike: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostLikeActions.postLikeUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPostLikes();
  const step = stepper(searchPostLikes(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostLikeActions.postLikeSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPostLikes(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostLikeActions.postLikeSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePostLike({ id: 1 });
  const step = stepper(deletePostLike(FixtureAPI, { postLikeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostLikeActions.postLikeDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePostLike(FixtureAPI, { postLikeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostLikeActions.postLikeDeleteFailure()));
});
