import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventRequest: ['eventId'],
  eventAllRequest: ['options'],
  eventUpdateRequest: ['event'],
  eventSearchRequest: ['query'],
  eventDeleteRequest: ['eventId'],

  eventSuccess: ['event'],
  eventAllSuccess: ['eventList', 'headers'],
  eventUpdateSuccess: ['event'],
  eventSearchSuccess: ['eventList'],
  eventDeleteSuccess: [],

  eventFailure: ['error'],
  eventAllFailure: ['error'],
  eventUpdateFailure: ['error'],
  eventSearchFailure: ['error'],
  eventDeleteFailure: ['error'],

  eventReset: [],
});

export const EventTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  event: { id: undefined },
  eventList: [],
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
    event: INITIAL_STATE.event,
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
  const { event } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    event,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { eventList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    eventList: loadMoreDataWhenScrolled(state.eventList, eventList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { event } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    event,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { eventList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    eventList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    event: INITIAL_STATE.event,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    event: INITIAL_STATE.event,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    eventList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    event: state.event,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    event: state.event,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    eventList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_REQUEST]: request,
  [Types.EVENT_ALL_REQUEST]: allRequest,
  [Types.EVENT_UPDATE_REQUEST]: updateRequest,
  [Types.EVENT_SEARCH_REQUEST]: searchRequest,
  [Types.EVENT_DELETE_REQUEST]: deleteRequest,

  [Types.EVENT_SUCCESS]: success,
  [Types.EVENT_ALL_SUCCESS]: allSuccess,
  [Types.EVENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.EVENT_SEARCH_SUCCESS]: searchSuccess,
  [Types.EVENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.EVENT_FAILURE]: failure,
  [Types.EVENT_ALL_FAILURE]: allFailure,
  [Types.EVENT_UPDATE_FAILURE]: updateFailure,
  [Types.EVENT_SEARCH_FAILURE]: searchFailure,
  [Types.EVENT_DELETE_FAILURE]: deleteFailure,
  [Types.EVENT_RESET]: reset,
});
