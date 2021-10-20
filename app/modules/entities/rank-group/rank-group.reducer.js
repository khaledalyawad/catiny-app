import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rankGroupRequest: ['rankGroupId'],
  rankGroupAllRequest: ['options'],
  rankGroupUpdateRequest: ['rankGroup'],
  rankGroupSearchRequest: ['query'],
  rankGroupDeleteRequest: ['rankGroupId'],

  rankGroupSuccess: ['rankGroup'],
  rankGroupAllSuccess: ['rankGroupList', 'headers'],
  rankGroupUpdateSuccess: ['rankGroup'],
  rankGroupSearchSuccess: ['rankGroupList'],
  rankGroupDeleteSuccess: [],

  rankGroupFailure: ['error'],
  rankGroupAllFailure: ['error'],
  rankGroupUpdateFailure: ['error'],
  rankGroupSearchFailure: ['error'],
  rankGroupDeleteFailure: ['error'],

  rankGroupReset: [],
});

export const RankGroupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  rankGroup: { id: undefined },
  rankGroupList: [],
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
    rankGroup: INITIAL_STATE.rankGroup,
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
  const { rankGroup } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    rankGroup,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { rankGroupList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    rankGroupList: loadMoreDataWhenScrolled(state.rankGroupList, rankGroupList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { rankGroup } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    rankGroup,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { rankGroupList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    rankGroupList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    rankGroup: INITIAL_STATE.rankGroup,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    rankGroup: INITIAL_STATE.rankGroup,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    rankGroupList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    rankGroup: state.rankGroup,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    rankGroup: state.rankGroup,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    rankGroupList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RANK_GROUP_REQUEST]: request,
  [Types.RANK_GROUP_ALL_REQUEST]: allRequest,
  [Types.RANK_GROUP_UPDATE_REQUEST]: updateRequest,
  [Types.RANK_GROUP_SEARCH_REQUEST]: searchRequest,
  [Types.RANK_GROUP_DELETE_REQUEST]: deleteRequest,

  [Types.RANK_GROUP_SUCCESS]: success,
  [Types.RANK_GROUP_ALL_SUCCESS]: allSuccess,
  [Types.RANK_GROUP_UPDATE_SUCCESS]: updateSuccess,
  [Types.RANK_GROUP_SEARCH_SUCCESS]: searchSuccess,
  [Types.RANK_GROUP_DELETE_SUCCESS]: deleteSuccess,

  [Types.RANK_GROUP_FAILURE]: failure,
  [Types.RANK_GROUP_ALL_FAILURE]: allFailure,
  [Types.RANK_GROUP_UPDATE_FAILURE]: updateFailure,
  [Types.RANK_GROUP_SEARCH_FAILURE]: searchFailure,
  [Types.RANK_GROUP_DELETE_FAILURE]: deleteFailure,
  [Types.RANK_GROUP_RESET]: reset,
});
