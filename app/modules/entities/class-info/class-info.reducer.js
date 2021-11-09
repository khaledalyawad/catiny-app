import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  classInfoRequest: ['classInfoId'],
  classInfoAllRequest: ['options'],
  classInfoUpdateRequest: ['classInfo'],
  classInfoSearchRequest: ['query'],
  classInfoDeleteRequest: ['classInfoId'],

  classInfoSuccess: ['classInfo'],
  classInfoAllSuccess: ['classInfoList', 'headers'],
  classInfoUpdateSuccess: ['classInfo'],
  classInfoSearchSuccess: ['classInfoList'],
  classInfoDeleteSuccess: [],

  classInfoFailure: ['error'],
  classInfoAllFailure: ['error'],
  classInfoUpdateFailure: ['error'],
  classInfoSearchFailure: ['error'],
  classInfoDeleteFailure: ['error'],

  classInfoReset: [],
});

export const ClassInfoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  classInfo: {id: undefined},
  classInfoList: [],
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
    classInfo: INITIAL_STATE.classInfo,
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
  const {classInfo} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    classInfo,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {classInfoList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    classInfoList: loadMoreDataWhenScrolled(state.classInfoList, classInfoList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {classInfo} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    classInfo,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {classInfoList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    classInfoList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    classInfo: INITIAL_STATE.classInfo,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    classInfo: INITIAL_STATE.classInfo,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    classInfoList: [],
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
    classInfo: state.classInfo,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    classInfo: state.classInfo,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    classInfoList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLASS_INFO_REQUEST]: request,
  [Types.CLASS_INFO_ALL_REQUEST]: allRequest,
  [Types.CLASS_INFO_UPDATE_REQUEST]: updateRequest,
  [Types.CLASS_INFO_SEARCH_REQUEST]: searchRequest,
  [Types.CLASS_INFO_DELETE_REQUEST]: deleteRequest,

  [Types.CLASS_INFO_SUCCESS]: success,
  [Types.CLASS_INFO_ALL_SUCCESS]: allSuccess,
  [Types.CLASS_INFO_UPDATE_SUCCESS]: updateSuccess,
  [Types.CLASS_INFO_SEARCH_SUCCESS]: searchSuccess,
  [Types.CLASS_INFO_DELETE_SUCCESS]: deleteSuccess,

  [Types.CLASS_INFO_FAILURE]: failure,
  [Types.CLASS_INFO_ALL_FAILURE]: allFailure,
  [Types.CLASS_INFO_UPDATE_FAILURE]: updateFailure,
  [Types.CLASS_INFO_SEARCH_FAILURE]: searchFailure,
  [Types.CLASS_INFO_DELETE_FAILURE]: deleteFailure,
  [Types.CLASS_INFO_RESET]: reset,
});
