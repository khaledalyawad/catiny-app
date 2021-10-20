import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rankUserRequest: ['rankUserId'],
  rankUserAllRequest: ['options'],
  rankUserUpdateRequest: ['rankUser'],
  rankUserSearchRequest: ['query'],
  rankUserDeleteRequest: ['rankUserId'],

  rankUserSuccess: ['rankUser'],
  rankUserAllSuccess: ['rankUserList', 'headers'],
  rankUserUpdateSuccess: ['rankUser'],
  rankUserSearchSuccess: ['rankUserList'],
  rankUserDeleteSuccess: [],

  rankUserFailure: ['error'],
  rankUserAllFailure: ['error'],
  rankUserUpdateFailure: ['error'],
  rankUserSearchFailure: ['error'],
  rankUserDeleteFailure: ['error'],

  rankUserReset: [],
});

export const RankUserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  rankUser: { id: undefined },
  rankUserList: [],
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
    rankUser: INITIAL_STATE.rankUser,
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
  const { rankUser } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    rankUser,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { rankUserList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    rankUserList: loadMoreDataWhenScrolled(state.rankUserList, rankUserList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { rankUser } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    rankUser,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { rankUserList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    rankUserList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    rankUser: INITIAL_STATE.rankUser,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    rankUser: INITIAL_STATE.rankUser,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    rankUserList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    rankUser: state.rankUser,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    rankUser: state.rankUser,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    rankUserList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RANK_USER_REQUEST]: request,
  [Types.RANK_USER_ALL_REQUEST]: allRequest,
  [Types.RANK_USER_UPDATE_REQUEST]: updateRequest,
  [Types.RANK_USER_SEARCH_REQUEST]: searchRequest,
  [Types.RANK_USER_DELETE_REQUEST]: deleteRequest,

  [Types.RANK_USER_SUCCESS]: success,
  [Types.RANK_USER_ALL_SUCCESS]: allSuccess,
  [Types.RANK_USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.RANK_USER_SEARCH_SUCCESS]: searchSuccess,
  [Types.RANK_USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.RANK_USER_FAILURE]: failure,
  [Types.RANK_USER_ALL_FAILURE]: allFailure,
  [Types.RANK_USER_UPDATE_FAILURE]: updateFailure,
  [Types.RANK_USER_SEARCH_FAILURE]: searchFailure,
  [Types.RANK_USER_DELETE_FAILURE]: deleteFailure,
  [Types.RANK_USER_RESET]: reset,
});
