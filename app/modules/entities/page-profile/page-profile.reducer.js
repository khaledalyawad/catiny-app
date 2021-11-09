import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  pageProfileRequest: ['pageProfileId'],
  pageProfileAllRequest: ['options'],
  pageProfileUpdateRequest: ['pageProfile'],
  pageProfileSearchRequest: ['query'],
  pageProfileDeleteRequest: ['pageProfileId'],

  pageProfileSuccess: ['pageProfile'],
  pageProfileAllSuccess: ['pageProfileList', 'headers'],
  pageProfileUpdateSuccess: ['pageProfile'],
  pageProfileSearchSuccess: ['pageProfileList'],
  pageProfileDeleteSuccess: [],

  pageProfileFailure: ['error'],
  pageProfileAllFailure: ['error'],
  pageProfileUpdateFailure: ['error'],
  pageProfileSearchFailure: ['error'],
  pageProfileDeleteFailure: ['error'],

  pageProfileReset: [],
});

export const PageProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  pageProfile: {id: undefined},
  pageProfileList: [],
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
    pageProfile: INITIAL_STATE.pageProfile,
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
  const {pageProfile} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    pageProfile,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {pageProfileList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    pageProfileList: loadMoreDataWhenScrolled(state.pageProfileList, pageProfileList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {pageProfile} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    pageProfile,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {pageProfileList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    pageProfileList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    pageProfile: INITIAL_STATE.pageProfile,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    pageProfile: INITIAL_STATE.pageProfile,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    pageProfileList: [],
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
    pageProfile: state.pageProfile,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    pageProfile: state.pageProfile,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    pageProfileList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAGE_PROFILE_REQUEST]: request,
  [Types.PAGE_PROFILE_ALL_REQUEST]: allRequest,
  [Types.PAGE_PROFILE_UPDATE_REQUEST]: updateRequest,
  [Types.PAGE_PROFILE_SEARCH_REQUEST]: searchRequest,
  [Types.PAGE_PROFILE_DELETE_REQUEST]: deleteRequest,

  [Types.PAGE_PROFILE_SUCCESS]: success,
  [Types.PAGE_PROFILE_ALL_SUCCESS]: allSuccess,
  [Types.PAGE_PROFILE_UPDATE_SUCCESS]: updateSuccess,
  [Types.PAGE_PROFILE_SEARCH_SUCCESS]: searchSuccess,
  [Types.PAGE_PROFILE_DELETE_SUCCESS]: deleteSuccess,

  [Types.PAGE_PROFILE_FAILURE]: failure,
  [Types.PAGE_PROFILE_ALL_FAILURE]: allFailure,
  [Types.PAGE_PROFILE_UPDATE_FAILURE]: updateFailure,
  [Types.PAGE_PROFILE_SEARCH_FAILURE]: searchFailure,
  [Types.PAGE_PROFILE_DELETE_FAILURE]: deleteFailure,
  [Types.PAGE_PROFILE_RESET]: reset,
});
