import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hanhChinhVNRequest: ['hanhChinhVNId'],
  hanhChinhVNAllRequest: ['options'],
  hanhChinhVNUpdateRequest: ['hanhChinhVN'],
  hanhChinhVNSearchRequest: ['query'],
  hanhChinhVNDeleteRequest: ['hanhChinhVNId'],

  hanhChinhVNSuccess: ['hanhChinhVN'],
  hanhChinhVNAllSuccess: ['hanhChinhVNList', 'headers'],
  hanhChinhVNUpdateSuccess: ['hanhChinhVN'],
  hanhChinhVNSearchSuccess: ['hanhChinhVNList'],
  hanhChinhVNDeleteSuccess: [],

  hanhChinhVNFailure: ['error'],
  hanhChinhVNAllFailure: ['error'],
  hanhChinhVNUpdateFailure: ['error'],
  hanhChinhVNSearchFailure: ['error'],
  hanhChinhVNDeleteFailure: ['error'],

  hanhChinhVNReset: [],
});

export const HanhChinhVNTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  hanhChinhVN: { id: undefined },
  hanhChinhVNList: [],
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
    hanhChinhVN: INITIAL_STATE.hanhChinhVN,
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
  const { hanhChinhVN } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    hanhChinhVN,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { hanhChinhVNList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    hanhChinhVNList: loadMoreDataWhenScrolled(state.hanhChinhVNList, hanhChinhVNList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { hanhChinhVN } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    hanhChinhVN,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { hanhChinhVNList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    hanhChinhVNList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    hanhChinhVN: INITIAL_STATE.hanhChinhVN,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    hanhChinhVN: INITIAL_STATE.hanhChinhVN,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    hanhChinhVNList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    hanhChinhVN: state.hanhChinhVN,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    hanhChinhVN: state.hanhChinhVN,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    hanhChinhVNList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HANH_CHINH_VN_REQUEST]: request,
  [Types.HANH_CHINH_VN_ALL_REQUEST]: allRequest,
  [Types.HANH_CHINH_VN_UPDATE_REQUEST]: updateRequest,
  [Types.HANH_CHINH_VN_SEARCH_REQUEST]: searchRequest,
  [Types.HANH_CHINH_VN_DELETE_REQUEST]: deleteRequest,

  [Types.HANH_CHINH_VN_SUCCESS]: success,
  [Types.HANH_CHINH_VN_ALL_SUCCESS]: allSuccess,
  [Types.HANH_CHINH_VN_UPDATE_SUCCESS]: updateSuccess,
  [Types.HANH_CHINH_VN_SEARCH_SUCCESS]: searchSuccess,
  [Types.HANH_CHINH_VN_DELETE_SUCCESS]: deleteSuccess,

  [Types.HANH_CHINH_VN_FAILURE]: failure,
  [Types.HANH_CHINH_VN_ALL_FAILURE]: allFailure,
  [Types.HANH_CHINH_VN_UPDATE_FAILURE]: updateFailure,
  [Types.HANH_CHINH_VN_SEARCH_FAILURE]: searchFailure,
  [Types.HANH_CHINH_VN_DELETE_FAILURE]: deleteFailure,
  [Types.HANH_CHINH_VN_RESET]: reset,
});
