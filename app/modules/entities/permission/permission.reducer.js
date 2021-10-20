import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  permissionRequest: ['permissionId'],
  permissionAllRequest: ['options'],
  permissionUpdateRequest: ['permission'],
  permissionSearchRequest: ['query'],
  permissionDeleteRequest: ['permissionId'],

  permissionSuccess: ['permission'],
  permissionAllSuccess: ['permissionList', 'headers'],
  permissionUpdateSuccess: ['permission'],
  permissionSearchSuccess: ['permissionList'],
  permissionDeleteSuccess: [],

  permissionFailure: ['error'],
  permissionAllFailure: ['error'],
  permissionUpdateFailure: ['error'],
  permissionSearchFailure: ['error'],
  permissionDeleteFailure: ['error'],

  permissionReset: [],
});

export const PermissionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  permission: { id: undefined },
  permissionList: [],
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
    permission: INITIAL_STATE.permission,
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
  const { permission } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    permission,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { permissionList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    permissionList: loadMoreDataWhenScrolled(state.permissionList, permissionList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { permission } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    permission,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { permissionList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    permissionList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    permission: INITIAL_STATE.permission,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    permission: INITIAL_STATE.permission,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    permissionList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    permission: state.permission,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    permission: state.permission,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    permissionList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERMISSION_REQUEST]: request,
  [Types.PERMISSION_ALL_REQUEST]: allRequest,
  [Types.PERMISSION_UPDATE_REQUEST]: updateRequest,
  [Types.PERMISSION_SEARCH_REQUEST]: searchRequest,
  [Types.PERMISSION_DELETE_REQUEST]: deleteRequest,

  [Types.PERMISSION_SUCCESS]: success,
  [Types.PERMISSION_ALL_SUCCESS]: allSuccess,
  [Types.PERMISSION_UPDATE_SUCCESS]: updateSuccess,
  [Types.PERMISSION_SEARCH_SUCCESS]: searchSuccess,
  [Types.PERMISSION_DELETE_SUCCESS]: deleteSuccess,

  [Types.PERMISSION_FAILURE]: failure,
  [Types.PERMISSION_ALL_FAILURE]: allFailure,
  [Types.PERMISSION_UPDATE_FAILURE]: updateFailure,
  [Types.PERMISSION_SEARCH_FAILURE]: searchFailure,
  [Types.PERMISSION_DELETE_FAILURE]: deleteFailure,
  [Types.PERMISSION_RESET]: reset,
});
