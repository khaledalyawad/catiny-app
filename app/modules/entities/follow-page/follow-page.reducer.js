import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  followPageRequest: ['followPageId'],
  followPageAllRequest: ['options'],
  followPageUpdateRequest: ['followPage'],
  followPageSearchRequest: ['query'],
  followPageDeleteRequest: ['followPageId'],

  followPageSuccess: ['followPage'],
  followPageAllSuccess: ['followPageList', 'headers'],
  followPageUpdateSuccess: ['followPage'],
  followPageSearchSuccess: ['followPageList'],
  followPageDeleteSuccess: [],

  followPageFailure: ['error'],
  followPageAllFailure: ['error'],
  followPageUpdateFailure: ['error'],
  followPageSearchFailure: ['error'],
  followPageDeleteFailure: ['error'],

  followPageReset: [],
});

export const FollowPageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  followPage: { id: undefined },
  followPageList: [],
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
    followPage: INITIAL_STATE.followPage,
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
  const { followPage } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    followPage,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { followPageList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    followPageList: loadMoreDataWhenScrolled(state.followPageList, followPageList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { followPage } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    followPage,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { followPageList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    followPageList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    followPage: INITIAL_STATE.followPage,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    followPage: INITIAL_STATE.followPage,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    followPageList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    followPage: state.followPage,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    followPage: state.followPage,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    followPageList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLLOW_PAGE_REQUEST]: request,
  [Types.FOLLOW_PAGE_ALL_REQUEST]: allRequest,
  [Types.FOLLOW_PAGE_UPDATE_REQUEST]: updateRequest,
  [Types.FOLLOW_PAGE_SEARCH_REQUEST]: searchRequest,
  [Types.FOLLOW_PAGE_DELETE_REQUEST]: deleteRequest,

  [Types.FOLLOW_PAGE_SUCCESS]: success,
  [Types.FOLLOW_PAGE_ALL_SUCCESS]: allSuccess,
  [Types.FOLLOW_PAGE_UPDATE_SUCCESS]: updateSuccess,
  [Types.FOLLOW_PAGE_SEARCH_SUCCESS]: searchSuccess,
  [Types.FOLLOW_PAGE_DELETE_SUCCESS]: deleteSuccess,

  [Types.FOLLOW_PAGE_FAILURE]: failure,
  [Types.FOLLOW_PAGE_ALL_FAILURE]: allFailure,
  [Types.FOLLOW_PAGE_UPDATE_FAILURE]: updateFailure,
  [Types.FOLLOW_PAGE_SEARCH_FAILURE]: searchFailure,
  [Types.FOLLOW_PAGE_DELETE_FAILURE]: deleteFailure,
  [Types.FOLLOW_PAGE_RESET]: reset,
});
