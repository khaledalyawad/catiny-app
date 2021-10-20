import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pagePostRequest: ['pagePostId'],
  pagePostAllRequest: ['options'],
  pagePostUpdateRequest: ['pagePost'],
  pagePostSearchRequest: ['query'],
  pagePostDeleteRequest: ['pagePostId'],

  pagePostSuccess: ['pagePost'],
  pagePostAllSuccess: ['pagePostList', 'headers'],
  pagePostUpdateSuccess: ['pagePost'],
  pagePostSearchSuccess: ['pagePostList'],
  pagePostDeleteSuccess: [],

  pagePostFailure: ['error'],
  pagePostAllFailure: ['error'],
  pagePostUpdateFailure: ['error'],
  pagePostSearchFailure: ['error'],
  pagePostDeleteFailure: ['error'],

  pagePostReset: [],
});

export const PagePostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  pagePost: { id: undefined },
  pagePostList: [],
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
    pagePost: INITIAL_STATE.pagePost,
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
  const { pagePost } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    pagePost,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { pagePostList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    pagePostList: loadMoreDataWhenScrolled(state.pagePostList, pagePostList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { pagePost } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    pagePost,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { pagePostList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    pagePostList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    pagePost: INITIAL_STATE.pagePost,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    pagePost: INITIAL_STATE.pagePost,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    pagePostList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    pagePost: state.pagePost,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    pagePost: state.pagePost,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    pagePostList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAGE_POST_REQUEST]: request,
  [Types.PAGE_POST_ALL_REQUEST]: allRequest,
  [Types.PAGE_POST_UPDATE_REQUEST]: updateRequest,
  [Types.PAGE_POST_SEARCH_REQUEST]: searchRequest,
  [Types.PAGE_POST_DELETE_REQUEST]: deleteRequest,

  [Types.PAGE_POST_SUCCESS]: success,
  [Types.PAGE_POST_ALL_SUCCESS]: allSuccess,
  [Types.PAGE_POST_UPDATE_SUCCESS]: updateSuccess,
  [Types.PAGE_POST_SEARCH_SUCCESS]: searchSuccess,
  [Types.PAGE_POST_DELETE_SUCCESS]: deleteSuccess,

  [Types.PAGE_POST_FAILURE]: failure,
  [Types.PAGE_POST_ALL_FAILURE]: allFailure,
  [Types.PAGE_POST_UPDATE_FAILURE]: updateFailure,
  [Types.PAGE_POST_SEARCH_FAILURE]: searchFailure,
  [Types.PAGE_POST_DELETE_FAILURE]: deleteFailure,
  [Types.PAGE_POST_RESET]: reset,
});
