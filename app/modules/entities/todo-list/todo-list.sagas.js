import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import TodoListActions from './todo-list.reducer';

function* getTodoList(api, action)
{
  const {todoListId} = action;
  // make the call to the api
  const apiCall = call(api.getTodoList, todoListId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TodoListActions.todoListSuccess(response.data));
  }
  else
  {
    yield put(TodoListActions.todoListFailure(response.data));
  }
}

function* getAllTodoLists(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllTodoLists, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TodoListActions.todoListAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(TodoListActions.todoListAllFailure(response.data));
  }
}

function* updateTodoList(api, action)
{
  const {todoList} = action;
  // make the call to the api
  const idIsNotNull = !(todoList.id === null || todoList.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateTodoList : api.createTodoList, todoList);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TodoListActions.todoListUpdateSuccess(response.data));
  }
  else
  {
    yield put(TodoListActions.todoListUpdateFailure(response.data));
  }
}

function* searchTodoLists(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchTodoLists, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TodoListActions.todoListSearchSuccess(response.data));
  }
  else
  {
    yield put(TodoListActions.todoListSearchFailure(response.data));
  }
}

function* deleteTodoList(api, action)
{
  const {todoListId} = action;
  // make the call to the api
  const apiCall = call(api.deleteTodoList, todoListId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(TodoListActions.todoListDeleteSuccess());
  }
  else
  {
    yield put(TodoListActions.todoListDeleteFailure(response.data));
  }
}

export default {
  getAllTodoLists,
  getTodoList,
  deleteTodoList,
  searchTodoLists,
  updateTodoList,
};
