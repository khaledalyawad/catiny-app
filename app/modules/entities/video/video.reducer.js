import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  videoRequest: ['videoId'],
  videoAllRequest: ['options'],
  videoUpdateRequest: ['video'],
  videoSearchRequest: ['query'],
  videoDeleteRequest: ['videoId'],

  videoSuccess: ['video'],
  videoAllSuccess: ['videoList', 'headers'],
  videoUpdateSuccess: ['video'],
  videoSearchSuccess: ['videoList'],
  videoDeleteSuccess: [],

  videoFailure: ['error'],
  videoAllFailure: ['error'],
  videoUpdateFailure: ['error'],
  videoSearchFailure: ['error'],
  videoDeleteFailure: ['error'],

  videoReset: [],
});

export const VideoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  video: {id: undefined},
  videoList: [],
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
    video: INITIAL_STATE.video,
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
  const {video} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    video,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {videoList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    videoList: loadMoreDataWhenScrolled(state.videoList, videoList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {video} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    video,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {videoList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    videoList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    video: INITIAL_STATE.video,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    video: INITIAL_STATE.video,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    videoList: [],
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
    video: state.video,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    video: state.video,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    videoList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIDEO_REQUEST]: request,
  [Types.VIDEO_ALL_REQUEST]: allRequest,
  [Types.VIDEO_UPDATE_REQUEST]: updateRequest,
  [Types.VIDEO_SEARCH_REQUEST]: searchRequest,
  [Types.VIDEO_DELETE_REQUEST]: deleteRequest,

  [Types.VIDEO_SUCCESS]: success,
  [Types.VIDEO_ALL_SUCCESS]: allSuccess,
  [Types.VIDEO_UPDATE_SUCCESS]: updateSuccess,
  [Types.VIDEO_SEARCH_SUCCESS]: searchSuccess,
  [Types.VIDEO_DELETE_SUCCESS]: deleteSuccess,

  [Types.VIDEO_FAILURE]: failure,
  [Types.VIDEO_ALL_FAILURE]: allFailure,
  [Types.VIDEO_UPDATE_FAILURE]: updateFailure,
  [Types.VIDEO_SEARCH_FAILURE]: searchFailure,
  [Types.VIDEO_DELETE_FAILURE]: deleteFailure,
  [Types.VIDEO_RESET]: reset,
});
