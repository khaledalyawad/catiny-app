import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  followGroupRequest: ['followGroupId'],
  followGroupAllRequest: ['options'],
  followGroupUpdateRequest: ['followGroup'],
  followGroupSearchRequest: ['query'],
  followGroupDeleteRequest: ['followGroupId'],

  followGroupSuccess: ['followGroup'],
  followGroupAllSuccess: ['followGroupList', 'headers'],
  followGroupUpdateSuccess: ['followGroup'],
  followGroupSearchSuccess: ['followGroupList'],
  followGroupDeleteSuccess: [],

  followGroupFailure: ['error'],
  followGroupAllFailure: ['error'],
  followGroupUpdateFailure: ['error'],
  followGroupSearchFailure: ['error'],
  followGroupDeleteFailure: ['error'],

  followGroupReset: [],
});

export const FollowGroupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  followGroup: {id: undefined},
  followGroupList: [],
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
    followGroup: INITIAL_STATE.followGroup,
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
  const {followGroup} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    followGroup,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {followGroupList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    followGroupList: loadMoreDataWhenScrolled(state.followGroupList, followGroupList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {followGroup} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    followGroup,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {followGroupList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    followGroupList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    followGroup: INITIAL_STATE.followGroup,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    followGroup: INITIAL_STATE.followGroup,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    followGroupList: [],
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
    followGroup: state.followGroup,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    followGroup: state.followGroup,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    followGroupList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLLOW_GROUP_REQUEST]: request,
  [Types.FOLLOW_GROUP_ALL_REQUEST]: allRequest,
  [Types.FOLLOW_GROUP_UPDATE_REQUEST]: updateRequest,
  [Types.FOLLOW_GROUP_SEARCH_REQUEST]: searchRequest,
  [Types.FOLLOW_GROUP_DELETE_REQUEST]: deleteRequest,

  [Types.FOLLOW_GROUP_SUCCESS]: success,
  [Types.FOLLOW_GROUP_ALL_SUCCESS]: allSuccess,
  [Types.FOLLOW_GROUP_UPDATE_SUCCESS]: updateSuccess,
  [Types.FOLLOW_GROUP_SEARCH_SUCCESS]: searchSuccess,
  [Types.FOLLOW_GROUP_DELETE_SUCCESS]: deleteSuccess,

  [Types.FOLLOW_GROUP_FAILURE]: failure,
  [Types.FOLLOW_GROUP_ALL_FAILURE]: allFailure,
  [Types.FOLLOW_GROUP_UPDATE_FAILURE]: updateFailure,
  [Types.FOLLOW_GROUP_SEARCH_FAILURE]: searchFailure,
  [Types.FOLLOW_GROUP_DELETE_FAILURE]: deleteFailure,
  [Types.FOLLOW_GROUP_RESET]: reset,
});
