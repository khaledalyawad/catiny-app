import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  postLikeRequest: ['postLikeId'],
  postLikeAllRequest: ['options'],
  postLikeUpdateRequest: ['postLike'],
  postLikeSearchRequest: ['query'],
  postLikeDeleteRequest: ['postLikeId'],

  postLikeSuccess: ['postLike'],
  postLikeAllSuccess: ['postLikeList', 'headers'],
  postLikeUpdateSuccess: ['postLike'],
  postLikeSearchSuccess: ['postLikeList'],
  postLikeDeleteSuccess: [],

  postLikeFailure: ['error'],
  postLikeAllFailure: ['error'],
  postLikeUpdateFailure: ['error'],
  postLikeSearchFailure: ['error'],
  postLikeDeleteFailure: ['error'],

  postLikeReset: [],
});

export const PostLikeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  postLike: {id: undefined},
  postLikeList: [],
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
    postLike: INITIAL_STATE.postLike,
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
  const {postLike} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    postLike,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {postLikeList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    postLikeList: loadMoreDataWhenScrolled(state.postLikeList, postLikeList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {postLike} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    postLike,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {postLikeList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    postLikeList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    postLike: INITIAL_STATE.postLike,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    postLike: INITIAL_STATE.postLike,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    postLikeList: [],
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
    postLike: state.postLike,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    postLike: state.postLike,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    postLikeList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_LIKE_REQUEST]: request,
  [Types.POST_LIKE_ALL_REQUEST]: allRequest,
  [Types.POST_LIKE_UPDATE_REQUEST]: updateRequest,
  [Types.POST_LIKE_SEARCH_REQUEST]: searchRequest,
  [Types.POST_LIKE_DELETE_REQUEST]: deleteRequest,

  [Types.POST_LIKE_SUCCESS]: success,
  [Types.POST_LIKE_ALL_SUCCESS]: allSuccess,
  [Types.POST_LIKE_UPDATE_SUCCESS]: updateSuccess,
  [Types.POST_LIKE_SEARCH_SUCCESS]: searchSuccess,
  [Types.POST_LIKE_DELETE_SUCCESS]: deleteSuccess,

  [Types.POST_LIKE_FAILURE]: failure,
  [Types.POST_LIKE_ALL_FAILURE]: allFailure,
  [Types.POST_LIKE_UPDATE_FAILURE]: updateFailure,
  [Types.POST_LIKE_SEARCH_FAILURE]: searchFailure,
  [Types.POST_LIKE_DELETE_FAILURE]: deleteFailure,
  [Types.POST_LIKE_RESET]: reset,
});
