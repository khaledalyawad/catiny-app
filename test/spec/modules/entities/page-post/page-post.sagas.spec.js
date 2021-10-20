import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import PagePostSagas from '../../../../../app/modules/entities/page-post/page-post.sagas';
import PagePostActions from '../../../../../app/modules/entities/page-post/page-post.reducer';

const { getPagePost, getAllPagePosts, updatePagePost, deletePagePost, searchPagePosts } = PagePostSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getPagePost(1);
  const step = stepper(getPagePost(FixtureAPI, { pagePostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PagePostActions.pagePostSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getPagePost(FixtureAPI, { pagePostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PagePostActions.pagePostFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllPagePosts();
  const step = stepper(getAllPagePosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PagePostActions.pagePostAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllPagePosts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PagePostActions.pagePostAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updatePagePost({ id: 1 });
  const step = stepper(updatePagePost(FixtureAPI, { pagePost: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PagePostActions.pagePostUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updatePagePost(FixtureAPI, { pagePost: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PagePostActions.pagePostUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchPagePosts();
  const step = stepper(searchPagePosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PagePostActions.pagePostSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchPagePosts(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PagePostActions.pagePostSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deletePagePost({ id: 1 });
  const step = stepper(deletePagePost(FixtureAPI, { pagePostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PagePostActions.pagePostDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deletePagePost(FixtureAPI, { pagePostId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PagePostActions.pagePostDeleteFailure()));
});
