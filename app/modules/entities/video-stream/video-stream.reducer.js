import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  videoStreamRequest: ['videoStreamId'],
  videoStreamAllRequest: ['options'],
  videoStreamUpdateRequest: ['videoStream'],
  videoStreamSearchRequest: ['query'],
  videoStreamDeleteRequest: ['videoStreamId'],

  videoStreamSuccess: ['videoStream'],
  videoStreamAllSuccess: ['videoStreamList', 'headers'],
  videoStreamUpdateSuccess: ['videoStream'],
  videoStreamSearchSuccess: ['videoStreamList'],
  videoStreamDeleteSuccess: [],

  videoStreamFailure: ['error'],
  videoStreamAllFailure: ['error'],
  videoStreamUpdateFailure: ['error'],
  videoStreamSearchFailure: ['error'],
  videoStreamDeleteFailure: ['error'],

  videoStreamReset: [],
});

export const VideoStreamTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  videoStream: {id: undefined},
  videoStreamList: [],
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
    videoStream: INITIAL_STATE.videoStream,
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
  const {videoStream} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    videoStream,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {videoStreamList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    videoStreamList: loadMoreDataWhenScrolled(state.videoStreamList, videoStreamList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {videoStream} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    videoStream,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {videoStreamList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    videoStreamList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    videoStream: INITIAL_STATE.videoStream,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    videoStream: INITIAL_STATE.videoStream,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    videoStreamList: [],
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
    videoStream: state.videoStream,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    videoStream: state.videoStream,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    videoStreamList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIDEO_STREAM_REQUEST]: request,
  [Types.VIDEO_STREAM_ALL_REQUEST]: allRequest,
  [Types.VIDEO_STREAM_UPDATE_REQUEST]: updateRequest,
  [Types.VIDEO_STREAM_SEARCH_REQUEST]: searchRequest,
  [Types.VIDEO_STREAM_DELETE_REQUEST]: deleteRequest,

  [Types.VIDEO_STREAM_SUCCESS]: success,
  [Types.VIDEO_STREAM_ALL_SUCCESS]: allSuccess,
  [Types.VIDEO_STREAM_UPDATE_SUCCESS]: updateSuccess,
  [Types.VIDEO_STREAM_SEARCH_SUCCESS]: searchSuccess,
  [Types.VIDEO_STREAM_DELETE_SUCCESS]: deleteSuccess,

  [Types.VIDEO_STREAM_FAILURE]: failure,
  [Types.VIDEO_STREAM_ALL_FAILURE]: allFailure,
  [Types.VIDEO_STREAM_UPDATE_FAILURE]: updateFailure,
  [Types.VIDEO_STREAM_SEARCH_FAILURE]: searchFailure,
  [Types.VIDEO_STREAM_DELETE_FAILURE]: deleteFailure,
  [Types.VIDEO_STREAM_RESET]: reset,
});
