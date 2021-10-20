import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PostCommentSagas from '../../../../../app/modules/entities/post-comment/post-comment.sagas';
import PostCommentActions from '../../../../../app/modules/entities/post-comment/post-comment.reducer';

const { getPostComment, getAllPostComments, updatePostComment, deletePostComment, searchPostComments } = PostCommentSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPostComment(1);
  const step = stepper(getPostComment(FixtureAPI, { postCommentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostCommentActions.postCommentSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPostComment(FixtureAPI, { postCommentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostCommentActions.postCommentFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPostComments();
  const step = stepper(getAllPostComments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostCommentActions.postCommentAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPostComments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostCommentActions.postCommentAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePostComment({ id: 1 });
  const step = stepper(updatePostComment(FixtureAPI, { postComment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostCommentActions.postCommentUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePostComment(FixtureAPI, { postComment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostCommentActions.postCommentUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPostComments();
  const step = stepper(searchPostComments(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostCommentActions.postCommentSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPostComments(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostCommentActions.postCommentSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePostComment({ id: 1 });
  const step = stepper(deletePostComment(FixtureAPI, { postCommentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PostCommentActions.postCommentDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePostComment(FixtureAPI, { postCommentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PostCommentActions.postCommentDeleteFailure()));
});
