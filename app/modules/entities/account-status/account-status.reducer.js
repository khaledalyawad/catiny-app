import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountStatusRequest: ['accountStatusId'],
  accountStatusAllRequest: ['options'],
  accountStatusUpdateRequest: ['accountStatus'],
  accountStatusSearchRequest: ['query'],
  accountStatusDeleteRequest: ['accountStatusId'],

  accountStatusSuccess: ['accountStatus'],
  accountStatusAllSuccess: ['accountStatusList', 'headers'],
  accountStatusUpdateSuccess: ['accountStatus'],
  accountStatusSearchSuccess: ['accountStatusList'],
  accountStatusDeleteSuccess: [],

  accountStatusFailure: ['error'],
  accountStatusAllFailure: ['error'],
  accountStatusUpdateFailure: ['error'],
  accountStatusSearchFailure: ['error'],
  accountStatusDeleteFailure: ['error'],

  accountStatusReset: [],
});

export const AccountStatusTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  accountStatus: {id: undefined},
  accountStatusList: [],
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
    accountStatus: INITIAL_STATE.accountStatus,
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
  const {accountStatus} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    accountStatus,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {accountStatusList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    accountStatusList: loadMoreDataWhenScrolled(state.accountStatusList, accountStatusList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {accountStatus} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    accountStatus,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {accountStatusList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    accountStatusList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    accountStatus: INITIAL_STATE.accountStatus,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    accountStatus: INITIAL_STATE.accountStatus,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    accountStatusList: [],
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
    accountStatus: state.accountStatus,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    accountStatus: state.accountStatus,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    accountStatusList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_STATUS_REQUEST]: request,
  [Types.ACCOUNT_STATUS_ALL_REQUEST]: allRequest,
  [Types.ACCOUNT_STATUS_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_STATUS_SEARCH_REQUEST]: searchRequest,
  [Types.ACCOUNT_STATUS_DELETE_REQUEST]: deleteRequest,

  [Types.ACCOUNT_STATUS_SUCCESS]: success,
  [Types.ACCOUNT_STATUS_ALL_SUCCESS]: allSuccess,
  [Types.ACCOUNT_STATUS_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_STATUS_SEARCH_SUCCESS]: searchSuccess,
  [Types.ACCOUNT_STATUS_DELETE_SUCCESS]: deleteSuccess,

  [Types.ACCOUNT_STATUS_FAILURE]: failure,
  [Types.ACCOUNT_STATUS_ALL_FAILURE]: allFailure,
  [Types.ACCOUNT_STATUS_UPDATE_FAILURE]: updateFailure,
  [Types.ACCOUNT_STATUS_SEARCH_FAILURE]: searchFailure,
  [Types.ACCOUNT_STATUS_DELETE_FAILURE]: deleteFailure,
  [Types.ACCOUNT_STATUS_RESET]: reset,
});
