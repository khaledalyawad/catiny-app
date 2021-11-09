import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  groupProfileRequest: ['groupProfileId'],
  groupProfileAllRequest: ['options'],
  groupProfileUpdateRequest: ['groupProfile'],
  groupProfileSearchRequest: ['query'],
  groupProfileDeleteRequest: ['groupProfileId'],

  groupProfileSuccess: ['groupProfile'],
  groupProfileAllSuccess: ['groupProfileList', 'headers'],
  groupProfileUpdateSuccess: ['groupProfile'],
  groupProfileSearchSuccess: ['groupProfileList'],
  groupProfileDeleteSuccess: [],

  groupProfileFailure: ['error'],
  groupProfileAllFailure: ['error'],
  groupProfileUpdateFailure: ['error'],
  groupProfileSearchFailure: ['error'],
  groupProfileDeleteFailure: ['error'],

  groupProfileReset: [],
});

export const GroupProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  groupProfile: {id: undefined},
  groupProfileList: [],
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
    groupProfile: INITIAL_STATE.groupProfile,
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
  const {groupProfile} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    groupProfile,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {groupProfileList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    groupProfileList: loadMoreDataWhenScrolled(state.groupProfileList, groupProfileList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {groupProfile} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    groupProfile,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {groupProfileList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    groupProfileList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    groupProfile: INITIAL_STATE.groupProfile,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    groupProfile: INITIAL_STATE.groupProfile,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    groupProfileList: [],
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
    groupProfile: state.groupProfile,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    groupProfile: state.groupProfile,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    groupProfileList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GROUP_PROFILE_REQUEST]: request,
  [Types.GROUP_PROFILE_ALL_REQUEST]: allRequest,
  [Types.GROUP_PROFILE_UPDATE_REQUEST]: updateRequest,
  [Types.GROUP_PROFILE_SEARCH_REQUEST]: searchRequest,
  [Types.GROUP_PROFILE_DELETE_REQUEST]: deleteRequest,

  [Types.GROUP_PROFILE_SUCCESS]: success,
  [Types.GROUP_PROFILE_ALL_SUCCESS]: allSuccess,
  [Types.GROUP_PROFILE_UPDATE_SUCCESS]: updateSuccess,
  [Types.GROUP_PROFILE_SEARCH_SUCCESS]: searchSuccess,
  [Types.GROUP_PROFILE_DELETE_SUCCESS]: deleteSuccess,

  [Types.GROUP_PROFILE_FAILURE]: failure,
  [Types.GROUP_PROFILE_ALL_FAILURE]: allFailure,
  [Types.GROUP_PROFILE_UPDATE_FAILURE]: updateFailure,
  [Types.GROUP_PROFILE_SEARCH_FAILURE]: searchFailure,
  [Types.GROUP_PROFILE_DELETE_FAILURE]: deleteFailure,
  [Types.GROUP_PROFILE_RESET]: reset,
});
