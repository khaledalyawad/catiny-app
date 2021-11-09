import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  todoListRequest: ['todoListId'],
  todoListAllRequest: ['options'],
  todoListUpdateRequest: ['todoList'],
  todoListSearchRequest: ['query'],
  todoListDeleteRequest: ['todoListId'],

  todoListSuccess: ['todoList'],
  todoListAllSuccess: ['todoListList', 'headers'],
  todoListUpdateSuccess: ['todoList'],
  todoListSearchSuccess: ['todoListList'],
  todoListDeleteSuccess: [],

  todoListFailure: ['error'],
  todoListAllFailure: ['error'],
  todoListUpdateFailure: ['error'],
  todoListSearchFailure: ['error'],
  todoListDeleteFailure: ['error'],

  todoListReset: [],
});

export const TodoListTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  todoList: {id: undefined},
  todoListList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: {next: 0},
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    todoList: INITIAL_STATE.todoList,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) =>
{
  const {todoList} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    todoList,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {todoListList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    todoListList: loadMoreDataWhenScrolled(state.todoListList, todoListList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {todoList} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    todoList,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {todoListList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    todoListList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    todoList: INITIAL_STATE.todoList,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    todoList: INITIAL_STATE.todoList,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    todoListList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    todoList: state.todoList,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    todoList: state.todoList,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    todoListList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TODO_LIST_REQUEST]: request,
  [Types.TODO_LIST_ALL_REQUEST]: allRequest,
  [Types.TODO_LIST_UPDATE_REQUEST]: updateRequest,
  [Types.TODO_LIST_SEARCH_REQUEST]: searchRequest,
  [Types.TODO_LIST_DELETE_REQUEST]: deleteRequest,

  [Types.TODO_LIST_SUCCESS]: success,
  [Types.TODO_LIST_ALL_SUCCESS]: allSuccess,
  [Types.TODO_LIST_UPDATE_SUCCESS]: updateSuccess,
  [Types.TODO_LIST_SEARCH_SUCCESS]: searchSuccess,
  [Types.TODO_LIST_DELETE_SUCCESS]: deleteSuccess,

  [Types.TODO_LIST_FAILURE]: failure,
  [Types.TODO_LIST_ALL_FAILURE]: allFailure,
  [Types.TODO_LIST_UPDATE_FAILURE]: updateFailure,
  [Types.TODO_LIST_SEARCH_FAILURE]: searchFailure,
  [Types.TODO_LIST_DELETE_FAILURE]: deleteFailure,
  [Types.TODO_LIST_RESET]: reset,
});
