import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import TodoListSagas from '../../../../../app/modules/entities/todo-list/todo-list.sagas';
import TodoListActions from '../../../../../app/modules/entities/todo-list/todo-list.reducer';

const { getTodoList, getAllTodoLists, updateTodoList, deleteTodoList, searchTodoLists } = TodoListSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getTodoList(1);
  const step = stepper(getTodoList(FixtureAPI, { todoListId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TodoListActions.todoListSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getTodoList(FixtureAPI, { todoListId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TodoListActions.todoListFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllTodoLists();
  const step = stepper(getAllTodoLists(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TodoListActions.todoListAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllTodoLists(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TodoListActions.todoListAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateTodoList({ id: 1 });
  const step = stepper(updateTodoList(FixtureAPI, { todoList: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TodoListActions.todoListUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateTodoList(FixtureAPI, { todoList: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TodoListActions.todoListUpdateFailure()));
});

test('search success path', () => {
  const response = FixtureAPI.searchTodoLists();
  const step = stepper(searchTodoLists(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TodoListActions.todoListSearchSuccess([{ id: 1 }, { id: 2 }])));
});

test('search failure path', () => {
  const response = { ok: false };
  const step = stepper(searchTodoLists(FixtureAPI, '*'));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TodoListActions.todoListSearchFailure()));
});
test('delete success path', () => {
  const response = FixtureAPI.deleteTodoList({ id: 1 });
  const step = stepper(deleteTodoList(FixtureAPI, { todoListId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TodoListActions.todoListDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteTodoList(FixtureAPI, { todoListId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TodoListActions.todoListDeleteFailure()));
});
