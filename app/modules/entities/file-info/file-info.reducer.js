import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fileInfoRequest: ['fileInfoId'],
  fileInfoAllRequest: ['options'],
  fileInfoUpdateRequest: ['fileInfo'],
  fileInfoSearchRequest: ['query'],
  fileInfoDeleteRequest: ['fileInfoId'],

  fileInfoSuccess: ['fileInfo'],
  fileInfoAllSuccess: ['fileInfoList', 'headers'],
  fileInfoUpdateSuccess: ['fileInfo'],
  fileInfoSearchSuccess: ['fileInfoList'],
  fileInfoDeleteSuccess: [],

  fileInfoFailure: ['error'],
  fileInfoAllFailure: ['error'],
  fileInfoUpdateFailure: ['error'],
  fileInfoSearchFailure: ['error'],
  fileInfoDeleteFailure: ['error'],

  fileInfoReset: [],
});

export const FileInfoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  fileInfo: { id: undefined },
  fileInfoList: [],
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
    fileInfo: INITIAL_STATE.fileInfo,
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
  const { fileInfo } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    fileInfo,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { fileInfoList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    fileInfoList: loadMoreDataWhenScrolled(state.fileInfoList, fileInfoList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { fileInfo } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    fileInfo,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { fileInfoList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    fileInfoList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    fileInfo: INITIAL_STATE.fileInfo,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    fileInfo: INITIAL_STATE.fileInfo,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    fileInfoList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    fileInfo: state.fileInfo,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    fileInfo: state.fileInfo,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    fileInfoList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FILE_INFO_REQUEST]: request,
  [Types.FILE_INFO_ALL_REQUEST]: allRequest,
  [Types.FILE_INFO_UPDATE_REQUEST]: updateRequest,
  [Types.FILE_INFO_SEARCH_REQUEST]: searchRequest,
  [Types.FILE_INFO_DELETE_REQUEST]: deleteRequest,

  [Types.FILE_INFO_SUCCESS]: success,
  [Types.FILE_INFO_ALL_SUCCESS]: allSuccess,
  [Types.FILE_INFO_UPDATE_SUCCESS]: updateSuccess,
  [Types.FILE_INFO_SEARCH_SUCCESS]: searchSuccess,
  [Types.FILE_INFO_DELETE_SUCCESS]: deleteSuccess,

  [Types.FILE_INFO_FAILURE]: failure,
  [Types.FILE_INFO_ALL_FAILURE]: allFailure,
  [Types.FILE_INFO_UPDATE_FAILURE]: updateFailure,
  [Types.FILE_INFO_SEARCH_FAILURE]: searchFailure,
  [Types.FILE_INFO_DELETE_FAILURE]: deleteFailure,
  [Types.FILE_INFO_RESET]: reset,
});
