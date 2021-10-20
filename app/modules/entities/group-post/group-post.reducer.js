import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  groupPostRequest: ['groupPostId'],
  groupPostAllRequest: ['options'],
  groupPostUpdateRequest: ['groupPost'],
  groupPostSearchRequest: ['query'],
  groupPostDeleteRequest: ['groupPostId'],

  groupPostSuccess: ['groupPost'],
  groupPostAllSuccess: ['groupPostList', 'headers'],
  groupPostUpdateSuccess: ['groupPost'],
  groupPostSearchSuccess: ['groupPostList'],
  groupPostDeleteSuccess: [],

  groupPostFailure: ['error'],
  groupPostAllFailure: ['error'],
  groupPostUpdateFailure: ['error'],
  groupPostSearchFailure: ['error'],
  groupPostDeleteFailure: ['error'],

  groupPostReset: [],
});

export const GroupPostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  groupPost: { id: undefined },
  groupPostList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    groupPost: INITIAL_STATE.groupPost,
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
export const success = (state, action) => {
  const { groupPost } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    groupPost,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { groupPostList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    groupPostList: loadMoreDataWhenScrolled(state.groupPostList, groupPostList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { groupPost } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    groupPost,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { groupPostList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    groupPostList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    groupPost: INITIAL_STATE.groupPost,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    groupPost: INITIAL_STATE.groupPost,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    groupPostList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    groupPost: state.groupPost,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    groupPost: state.groupPost,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    groupPostList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GROUP_POST_REQUEST]: request,
  [Types.GROUP_POST_ALL_REQUEST]: allRequest,
  [Types.GROUP_POST_UPDATE_REQUEST]: updateRequest,
  [Types.GROUP_POST_SEARCH_REQUEST]: searchRequest,
  [Types.GROUP_POST_DELETE_REQUEST]: deleteRequest,

  [Types.GROUP_POST_SUCCESS]: success,
  [Types.GROUP_POST_ALL_SUCCESS]: allSuccess,
  [Types.GROUP_POST_UPDATE_SUCCESS]: updateSuccess,
  [Types.GROUP_POST_SEARCH_SUCCESS]: searchSuccess,
  [Types.GROUP_POST_DELETE_SUCCESS]: deleteSuccess,

  [Types.GROUP_POST_FAILURE]: failure,
  [Types.GROUP_POST_ALL_FAILURE]: allFailure,
  [Types.GROUP_POST_UPDATE_FAILURE]: updateFailure,
  [Types.GROUP_POST_SEARCH_FAILURE]: searchFailure,
  [Types.GROUP_POST_DELETE_FAILURE]: deleteFailure,
  [Types.GROUP_POST_RESET]: reset,
});
