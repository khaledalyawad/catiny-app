import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  followUserRequest: ['followUserId'],
  followUserAllRequest: ['options'],
  followUserUpdateRequest: ['followUser'],
  followUserSearchRequest: ['query'],
  followUserDeleteRequest: ['followUserId'],

  followUserSuccess: ['followUser'],
  followUserAllSuccess: ['followUserList', 'headers'],
  followUserUpdateSuccess: ['followUser'],
  followUserSearchSuccess: ['followUserList'],
  followUserDeleteSuccess: [],

  followUserFailure: ['error'],
  followUserAllFailure: ['error'],
  followUserUpdateFailure: ['error'],
  followUserSearchFailure: ['error'],
  followUserDeleteFailure: ['error'],

  followUserReset: [],
});

export const FollowUserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  followUser: { id: undefined },
  followUserList: [],
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
    followUser: INITIAL_STATE.followUser,
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
  const { followUser } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    followUser,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { followUserList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    followUserList: loadMoreDataWhenScrolled(state.followUserList, followUserList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { followUser } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    followUser,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { followUserList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    followUserList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    followUser: INITIAL_STATE.followUser,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    followUser: INITIAL_STATE.followUser,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    followUserList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    followUser: state.followUser,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    followUser: state.followUser,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    followUserList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLLOW_USER_REQUEST]: request,
  [Types.FOLLOW_USER_ALL_REQUEST]: allRequest,
  [Types.FOLLOW_USER_UPDATE_REQUEST]: updateRequest,
  [Types.FOLLOW_USER_SEARCH_REQUEST]: searchRequest,
  [Types.FOLLOW_USER_DELETE_REQUEST]: deleteRequest,

  [Types.FOLLOW_USER_SUCCESS]: success,
  [Types.FOLLOW_USER_ALL_SUCCESS]: allSuccess,
  [Types.FOLLOW_USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.FOLLOW_USER_SEARCH_SUCCESS]: searchSuccess,
  [Types.FOLLOW_USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.FOLLOW_USER_FAILURE]: failure,
  [Types.FOLLOW_USER_ALL_FAILURE]: allFailure,
  [Types.FOLLOW_USER_UPDATE_FAILURE]: updateFailure,
  [Types.FOLLOW_USER_SEARCH_FAILURE]: searchFailure,
  [Types.FOLLOW_USER_DELETE_FAILURE]: deleteFailure,
  [Types.FOLLOW_USER_RESET]: reset,
});
