import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postCommentRequest: ['postCommentId'],
  postCommentAllRequest: ['options'],
  postCommentUpdateRequest: ['postComment'],
  postCommentSearchRequest: ['query'],
  postCommentDeleteRequest: ['postCommentId'],

  postCommentSuccess: ['postComment'],
  postCommentAllSuccess: ['postCommentList', 'headers'],
  postCommentUpdateSuccess: ['postComment'],
  postCommentSearchSuccess: ['postCommentList'],
  postCommentDeleteSuccess: [],

  postCommentFailure: ['error'],
  postCommentAllFailure: ['error'],
  postCommentUpdateFailure: ['error'],
  postCommentSearchFailure: ['error'],
  postCommentDeleteFailure: ['error'],

  postCommentReset: [],
});

export const PostCommentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  postComment: { id: undefined },
  postCommentList: [],
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
    postComment: INITIAL_STATE.postComment,
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
  const { postComment } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    postComment,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { postCommentList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    postCommentList: loadMoreDataWhenScrolled(state.postCommentList, postCommentList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { postComment } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    postComment,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { postCommentList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    postCommentList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    postComment: INITIAL_STATE.postComment,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    postComment: INITIAL_STATE.postComment,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    postCommentList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    postComment: state.postComment,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    postComment: state.postComment,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    postCommentList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_COMMENT_REQUEST]: request,
  [Types.POST_COMMENT_ALL_REQUEST]: allRequest,
  [Types.POST_COMMENT_UPDATE_REQUEST]: updateRequest,
  [Types.POST_COMMENT_SEARCH_REQUEST]: searchRequest,
  [Types.POST_COMMENT_DELETE_REQUEST]: deleteRequest,

  [Types.POST_COMMENT_SUCCESS]: success,
  [Types.POST_COMMENT_ALL_SUCCESS]: allSuccess,
  [Types.POST_COMMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.POST_COMMENT_SEARCH_SUCCESS]: searchSuccess,
  [Types.POST_COMMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.POST_COMMENT_FAILURE]: failure,
  [Types.POST_COMMENT_ALL_FAILURE]: allFailure,
  [Types.POST_COMMENT_UPDATE_FAILURE]: updateFailure,
  [Types.POST_COMMENT_SEARCH_FAILURE]: searchFailure,
  [Types.POST_COMMENT_DELETE_FAILURE]: deleteFailure,
  [Types.POST_COMMENT_RESET]: reset,
});
