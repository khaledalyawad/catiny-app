import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  historyUpdateRequest: ['historyUpdateId'],
  historyUpdateAllRequest: ['options'],
  historyUpdateUpdateRequest: ['historyUpdate'],
  historyUpdateSearchRequest: ['query'],
  historyUpdateDeleteRequest: ['historyUpdateId'],

  historyUpdateSuccess: ['historyUpdate'],
  historyUpdateAllSuccess: ['historyUpdateList', 'headers'],
  historyUpdateUpdateSuccess: ['historyUpdate'],
  historyUpdateSearchSuccess: ['historyUpdateList'],
  historyUpdateDeleteSuccess: [],

  historyUpdateFailure: ['error'],
  historyUpdateAllFailure: ['error'],
  historyUpdateUpdateFailure: ['error'],
  historyUpdateSearchFailure: ['error'],
  historyUpdateDeleteFailure: ['error'],

  historyUpdateReset: [],
});

export const HistoryUpdateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  historyUpdate: { id: undefined },
  historyUpdateList: [],
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
    historyUpdate: INITIAL_STATE.historyUpdate,
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
  const { historyUpdate } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    historyUpdate,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { historyUpdateList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    historyUpdateList: loadMoreDataWhenScrolled(state.historyUpdateList, historyUpdateList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { historyUpdate } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    historyUpdate,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { historyUpdateList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    historyUpdateList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    historyUpdate: INITIAL_STATE.historyUpdate,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    historyUpdate: INITIAL_STATE.historyUpdate,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    historyUpdateList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    historyUpdate: state.historyUpdate,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    historyUpdate: state.historyUpdate,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    historyUpdateList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HISTORY_UPDATE_REQUEST]: request,
  [Types.HISTORY_UPDATE_ALL_REQUEST]: allRequest,
  [Types.HISTORY_UPDATE_UPDATE_REQUEST]: updateRequest,
  [Types.HISTORY_UPDATE_SEARCH_REQUEST]: searchRequest,
  [Types.HISTORY_UPDATE_DELETE_REQUEST]: deleteRequest,

  [Types.HISTORY_UPDATE_SUCCESS]: success,
  [Types.HISTORY_UPDATE_ALL_SUCCESS]: allSuccess,
  [Types.HISTORY_UPDATE_UPDATE_SUCCESS]: updateSuccess,
  [Types.HISTORY_UPDATE_SEARCH_SUCCESS]: searchSuccess,
  [Types.HISTORY_UPDATE_DELETE_SUCCESS]: deleteSuccess,

  [Types.HISTORY_UPDATE_FAILURE]: failure,
  [Types.HISTORY_UPDATE_ALL_FAILURE]: allFailure,
  [Types.HISTORY_UPDATE_UPDATE_FAILURE]: updateFailure,
  [Types.HISTORY_UPDATE_SEARCH_FAILURE]: searchFailure,
  [Types.HISTORY_UPDATE_DELETE_FAILURE]: deleteFailure,
  [Types.HISTORY_UPDATE_RESET]: reset,
});
