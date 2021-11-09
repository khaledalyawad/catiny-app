import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  baseInfoRequest: ['baseInfoId'],
  baseInfoAllRequest: ['options'],
  baseInfoUpdateRequest: ['baseInfo'],
  baseInfoSearchRequest: ['query'],
  baseInfoDeleteRequest: ['baseInfoId'],

  baseInfoSuccess: ['baseInfo'],
  baseInfoAllSuccess: ['baseInfoList', 'headers'],
  baseInfoUpdateSuccess: ['baseInfo'],
  baseInfoSearchSuccess: ['baseInfoList'],
  baseInfoDeleteSuccess: [],

  baseInfoFailure: ['error'],
  baseInfoAllFailure: ['error'],
  baseInfoUpdateFailure: ['error'],
  baseInfoSearchFailure: ['error'],
  baseInfoDeleteFailure: ['error'],

  baseInfoReset: [],
});

export const BaseInfoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  baseInfo: {id: undefined},
  baseInfoList: [],
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
    baseInfo: INITIAL_STATE.baseInfo,
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
  const {baseInfo} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    baseInfo,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {baseInfoList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    baseInfoList: loadMoreDataWhenScrolled(state.baseInfoList, baseInfoList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {baseInfo} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    baseInfo,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {baseInfoList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    baseInfoList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    baseInfo: INITIAL_STATE.baseInfo,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    baseInfo: INITIAL_STATE.baseInfo,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    baseInfoList: [],
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
    baseInfo: state.baseInfo,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    baseInfo: state.baseInfo,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    baseInfoList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BASE_INFO_REQUEST]: request,
  [Types.BASE_INFO_ALL_REQUEST]: allRequest,
  [Types.BASE_INFO_UPDATE_REQUEST]: updateRequest,
  [Types.BASE_INFO_SEARCH_REQUEST]: searchRequest,
  [Types.BASE_INFO_DELETE_REQUEST]: deleteRequest,

  [Types.BASE_INFO_SUCCESS]: success,
  [Types.BASE_INFO_ALL_SUCCESS]: allSuccess,
  [Types.BASE_INFO_UPDATE_SUCCESS]: updateSuccess,
  [Types.BASE_INFO_SEARCH_SUCCESS]: searchSuccess,
  [Types.BASE_INFO_DELETE_SUCCESS]: deleteSuccess,

  [Types.BASE_INFO_FAILURE]: failure,
  [Types.BASE_INFO_ALL_FAILURE]: allFailure,
  [Types.BASE_INFO_UPDATE_FAILURE]: updateFailure,
  [Types.BASE_INFO_SEARCH_FAILURE]: searchFailure,
  [Types.BASE_INFO_DELETE_FAILURE]: deleteFailure,
  [Types.BASE_INFO_RESET]: reset,
});
