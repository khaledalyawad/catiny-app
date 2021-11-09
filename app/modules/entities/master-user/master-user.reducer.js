import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  masterUserRequest: ['masterUserId'],
  masterUserAllRequest: ['options'],
  masterUserUpdateRequest: ['masterUser'],
  masterUserSearchRequest: ['query'],
  masterUserDeleteRequest: ['masterUserId'],

  masterUserSuccess: ['masterUser'],
  masterUserAllSuccess: ['masterUserList', 'headers'],
  masterUserUpdateSuccess: ['masterUser'],
  masterUserSearchSuccess: ['masterUserList'],
  masterUserDeleteSuccess: [],

  masterUserFailure: ['error'],
  masterUserAllFailure: ['error'],
  masterUserUpdateFailure: ['error'],
  masterUserSearchFailure: ['error'],
  masterUserDeleteFailure: ['error'],

  masterUserReset: [],
});

export const MasterUserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  masterUser: {id: undefined},
  masterUserList: [],
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
    masterUser: INITIAL_STATE.masterUser,
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
  const {masterUser} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    masterUser,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {masterUserList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    masterUserList: loadMoreDataWhenScrolled(state.masterUserList, masterUserList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {masterUser} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    masterUser,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {masterUserList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    masterUserList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    masterUser: INITIAL_STATE.masterUser,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    masterUser: INITIAL_STATE.masterUser,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    masterUserList: [],
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
    masterUser: state.masterUser,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    masterUser: state.masterUser,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    masterUserList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MASTER_USER_REQUEST]: request,
  [Types.MASTER_USER_ALL_REQUEST]: allRequest,
  [Types.MASTER_USER_UPDATE_REQUEST]: updateRequest,
  [Types.MASTER_USER_SEARCH_REQUEST]: searchRequest,
  [Types.MASTER_USER_DELETE_REQUEST]: deleteRequest,

  [Types.MASTER_USER_SUCCESS]: success,
  [Types.MASTER_USER_ALL_SUCCESS]: allSuccess,
  [Types.MASTER_USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.MASTER_USER_SEARCH_SUCCESS]: searchSuccess,
  [Types.MASTER_USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.MASTER_USER_FAILURE]: failure,
  [Types.MASTER_USER_ALL_FAILURE]: allFailure,
  [Types.MASTER_USER_UPDATE_FAILURE]: updateFailure,
  [Types.MASTER_USER_SEARCH_FAILURE]: searchFailure,
  [Types.MASTER_USER_DELETE_FAILURE]: deleteFailure,
  [Types.MASTER_USER_RESET]: reset,
});
