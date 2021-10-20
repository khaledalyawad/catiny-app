import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deviceStatusRequest: ['deviceStatusId'],
  deviceStatusAllRequest: ['options'],
  deviceStatusUpdateRequest: ['deviceStatus'],
  deviceStatusSearchRequest: ['query'],
  deviceStatusDeleteRequest: ['deviceStatusId'],

  deviceStatusSuccess: ['deviceStatus'],
  deviceStatusAllSuccess: ['deviceStatusList', 'headers'],
  deviceStatusUpdateSuccess: ['deviceStatus'],
  deviceStatusSearchSuccess: ['deviceStatusList'],
  deviceStatusDeleteSuccess: [],

  deviceStatusFailure: ['error'],
  deviceStatusAllFailure: ['error'],
  deviceStatusUpdateFailure: ['error'],
  deviceStatusSearchFailure: ['error'],
  deviceStatusDeleteFailure: ['error'],

  deviceStatusReset: [],
});

export const DeviceStatusTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  deviceStatus: { id: undefined },
  deviceStatusList: [],
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
    deviceStatus: INITIAL_STATE.deviceStatus,
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
  const { deviceStatus } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    deviceStatus,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { deviceStatusList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    deviceStatusList: loadMoreDataWhenScrolled(state.deviceStatusList, deviceStatusList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { deviceStatus } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    deviceStatus,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { deviceStatusList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    deviceStatusList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    deviceStatus: INITIAL_STATE.deviceStatus,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    deviceStatus: INITIAL_STATE.deviceStatus,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    deviceStatusList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    deviceStatus: state.deviceStatus,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    deviceStatus: state.deviceStatus,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    deviceStatusList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVICE_STATUS_REQUEST]: request,
  [Types.DEVICE_STATUS_ALL_REQUEST]: allRequest,
  [Types.DEVICE_STATUS_UPDATE_REQUEST]: updateRequest,
  [Types.DEVICE_STATUS_SEARCH_REQUEST]: searchRequest,
  [Types.DEVICE_STATUS_DELETE_REQUEST]: deleteRequest,

  [Types.DEVICE_STATUS_SUCCESS]: success,
  [Types.DEVICE_STATUS_ALL_SUCCESS]: allSuccess,
  [Types.DEVICE_STATUS_UPDATE_SUCCESS]: updateSuccess,
  [Types.DEVICE_STATUS_SEARCH_SUCCESS]: searchSuccess,
  [Types.DEVICE_STATUS_DELETE_SUCCESS]: deleteSuccess,

  [Types.DEVICE_STATUS_FAILURE]: failure,
  [Types.DEVICE_STATUS_ALL_FAILURE]: allFailure,
  [Types.DEVICE_STATUS_UPDATE_FAILURE]: updateFailure,
  [Types.DEVICE_STATUS_SEARCH_FAILURE]: searchFailure,
  [Types.DEVICE_STATUS_DELETE_FAILURE]: deleteFailure,
  [Types.DEVICE_STATUS_RESET]: reset,
});
