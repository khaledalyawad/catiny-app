import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  postRequest: ['postId'],
  postAllRequest: ['options'],
  postUpdateRequest: ['post'],
  postSearchRequest: ['query'],
  postDeleteRequest: ['postId'],

  postSuccess: ['post'],
  postAllSuccess: ['postList', 'headers'],
  postUpdateSuccess: ['post'],
  postSearchSuccess: ['postList'],
  postDeleteSuccess: [],

  postFailure: ['error'],
  postAllFailure: ['error'],
  postUpdateFailure: ['error'],
  postSearchFailure: ['error'],
  postDeleteFailure: ['error'],

  postReset: [],
});

export const PostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  post: {id: undefined},
  postList: [],
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
    post: INITIAL_STATE.post,
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
  const {post} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    post,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {postList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    postList: loadMoreDataWhenScrolled(state.postList, postList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {post} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    post,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {postList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    postList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    post: INITIAL_STATE.post,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    post: INITIAL_STATE.post,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    postList: [],
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
    post: state.post,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    post: state.post,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    postList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_ALL_REQUEST]: allRequest,
  [Types.POST_UPDATE_REQUEST]: updateRequest,
  [Types.POST_SEARCH_REQUEST]: searchRequest,
  [Types.POST_DELETE_REQUEST]: deleteRequest,

  [Types.POST_SUCCESS]: success,
  [Types.POST_ALL_SUCCESS]: allSuccess,
  [Types.POST_UPDATE_SUCCESS]: updateSuccess,
  [Types.POST_SEARCH_SUCCESS]: searchSuccess,
  [Types.POST_DELETE_SUCCESS]: deleteSuccess,

  [Types.POST_FAILURE]: failure,
  [Types.POST_ALL_FAILURE]: allFailure,
  [Types.POST_UPDATE_FAILURE]: updateFailure,
  [Types.POST_SEARCH_FAILURE]: searchFailure,
  [Types.POST_DELETE_FAILURE]: deleteFailure,
  [Types.POST_RESET]: reset,
});
