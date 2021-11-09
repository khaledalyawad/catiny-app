import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  topicInterestRequest: ['topicInterestId'],
  topicInterestAllRequest: ['options'],
  topicInterestUpdateRequest: ['topicInterest'],
  topicInterestSearchRequest: ['query'],
  topicInterestDeleteRequest: ['topicInterestId'],

  topicInterestSuccess: ['topicInterest'],
  topicInterestAllSuccess: ['topicInterestList', 'headers'],
  topicInterestUpdateSuccess: ['topicInterest'],
  topicInterestSearchSuccess: ['topicInterestList'],
  topicInterestDeleteSuccess: [],

  topicInterestFailure: ['error'],
  topicInterestAllFailure: ['error'],
  topicInterestUpdateFailure: ['error'],
  topicInterestSearchFailure: ['error'],
  topicInterestDeleteFailure: ['error'],

  topicInterestReset: [],
});

export const TopicInterestTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  topicInterest: {id: undefined},
  topicInterestList: [],
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
    topicInterest: INITIAL_STATE.topicInterest,
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
  const {topicInterest} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    topicInterest,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {topicInterestList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    topicInterestList: loadMoreDataWhenScrolled(state.topicInterestList, topicInterestList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {topicInterest} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    topicInterest,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {topicInterestList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    topicInterestList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    topicInterest: INITIAL_STATE.topicInterest,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    topicInterest: INITIAL_STATE.topicInterest,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    topicInterestList: [],
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
    topicInterest: state.topicInterest,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    topicInterest: state.topicInterest,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    topicInterestList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOPIC_INTEREST_REQUEST]: request,
  [Types.TOPIC_INTEREST_ALL_REQUEST]: allRequest,
  [Types.TOPIC_INTEREST_UPDATE_REQUEST]: updateRequest,
  [Types.TOPIC_INTEREST_SEARCH_REQUEST]: searchRequest,
  [Types.TOPIC_INTEREST_DELETE_REQUEST]: deleteRequest,

  [Types.TOPIC_INTEREST_SUCCESS]: success,
  [Types.TOPIC_INTEREST_ALL_SUCCESS]: allSuccess,
  [Types.TOPIC_INTEREST_UPDATE_SUCCESS]: updateSuccess,
  [Types.TOPIC_INTEREST_SEARCH_SUCCESS]: searchSuccess,
  [Types.TOPIC_INTEREST_DELETE_SUCCESS]: deleteSuccess,

  [Types.TOPIC_INTEREST_FAILURE]: failure,
  [Types.TOPIC_INTEREST_ALL_FAILURE]: allFailure,
  [Types.TOPIC_INTEREST_UPDATE_FAILURE]: updateFailure,
  [Types.TOPIC_INTEREST_SEARCH_FAILURE]: searchFailure,
  [Types.TOPIC_INTEREST_DELETE_FAILURE]: deleteFailure,
  [Types.TOPIC_INTEREST_RESET]: reset,
});
