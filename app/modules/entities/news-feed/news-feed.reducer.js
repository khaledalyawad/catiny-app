import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  newsFeedRequest: ['newsFeedId'],
  newsFeedAllRequest: ['options'],
  newsFeedUpdateRequest: ['newsFeed'],
  newsFeedSearchRequest: ['query'],
  newsFeedDeleteRequest: ['newsFeedId'],

  newsFeedSuccess: ['newsFeed'],
  newsFeedAllSuccess: ['newsFeedList', 'headers'],
  newsFeedUpdateSuccess: ['newsFeed'],
  newsFeedSearchSuccess: ['newsFeedList'],
  newsFeedDeleteSuccess: [],

  newsFeedFailure: ['error'],
  newsFeedAllFailure: ['error'],
  newsFeedUpdateFailure: ['error'],
  newsFeedSearchFailure: ['error'],
  newsFeedDeleteFailure: ['error'],

  newsFeedReset: [],
});

export const NewsFeedTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  newsFeed: {id: undefined},
  newsFeedList: [],
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
    newsFeed: INITIAL_STATE.newsFeed,
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
  const {newsFeed} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    newsFeed,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {newsFeedList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    newsFeedList: loadMoreDataWhenScrolled(state.newsFeedList, newsFeedList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {newsFeed} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    newsFeed,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {newsFeedList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    newsFeedList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    newsFeed: INITIAL_STATE.newsFeed,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    newsFeed: INITIAL_STATE.newsFeed,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    newsFeedList: [],
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
    newsFeed: state.newsFeed,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    newsFeed: state.newsFeed,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    newsFeedList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWS_FEED_REQUEST]: request,
  [Types.NEWS_FEED_ALL_REQUEST]: allRequest,
  [Types.NEWS_FEED_UPDATE_REQUEST]: updateRequest,
  [Types.NEWS_FEED_SEARCH_REQUEST]: searchRequest,
  [Types.NEWS_FEED_DELETE_REQUEST]: deleteRequest,

  [Types.NEWS_FEED_SUCCESS]: success,
  [Types.NEWS_FEED_ALL_SUCCESS]: allSuccess,
  [Types.NEWS_FEED_UPDATE_SUCCESS]: updateSuccess,
  [Types.NEWS_FEED_SEARCH_SUCCESS]: searchSuccess,
  [Types.NEWS_FEED_DELETE_SUCCESS]: deleteSuccess,

  [Types.NEWS_FEED_FAILURE]: failure,
  [Types.NEWS_FEED_ALL_FAILURE]: allFailure,
  [Types.NEWS_FEED_UPDATE_FAILURE]: updateFailure,
  [Types.NEWS_FEED_SEARCH_FAILURE]: searchFailure,
  [Types.NEWS_FEED_DELETE_FAILURE]: deleteFailure,
  [Types.NEWS_FEED_RESET]: reset,
});
