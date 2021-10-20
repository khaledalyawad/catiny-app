import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  videoLiveStreamBufferRequest: ['videoLiveStreamBufferId'],
  videoLiveStreamBufferAllRequest: ['options'],
  videoLiveStreamBufferUpdateRequest: ['videoLiveStreamBuffer'],
  videoLiveStreamBufferSearchRequest: ['query'],
  videoLiveStreamBufferDeleteRequest: ['videoLiveStreamBufferId'],

  videoLiveStreamBufferSuccess: ['videoLiveStreamBuffer'],
  videoLiveStreamBufferAllSuccess: ['videoLiveStreamBufferList', 'headers'],
  videoLiveStreamBufferUpdateSuccess: ['videoLiveStreamBuffer'],
  videoLiveStreamBufferSearchSuccess: ['videoLiveStreamBufferList'],
  videoLiveStreamBufferDeleteSuccess: [],

  videoLiveStreamBufferFailure: ['error'],
  videoLiveStreamBufferAllFailure: ['error'],
  videoLiveStreamBufferUpdateFailure: ['error'],
  videoLiveStreamBufferSearchFailure: ['error'],
  videoLiveStreamBufferDeleteFailure: ['error'],

  videoLiveStreamBufferReset: [],
});

export const VideoLiveStreamBufferTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  videoLiveStreamBuffer: { id: undefined },
  videoLiveStreamBufferList: [],
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
    videoLiveStreamBuffer: INITIAL_STATE.videoLiveStreamBuffer,
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
  const { videoLiveStreamBuffer } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    videoLiveStreamBuffer,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { videoLiveStreamBufferList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    videoLiveStreamBufferList: loadMoreDataWhenScrolled(state.videoLiveStreamBufferList, videoLiveStreamBufferList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { videoLiveStreamBuffer } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    videoLiveStreamBuffer,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { videoLiveStreamBufferList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    videoLiveStreamBufferList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    videoLiveStreamBuffer: INITIAL_STATE.videoLiveStreamBuffer,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    videoLiveStreamBuffer: INITIAL_STATE.videoLiveStreamBuffer,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    videoLiveStreamBufferList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    videoLiveStreamBuffer: state.videoLiveStreamBuffer,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    videoLiveStreamBuffer: state.videoLiveStreamBuffer,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    videoLiveStreamBufferList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIDEO_LIVE_STREAM_BUFFER_REQUEST]: request,
  [Types.VIDEO_LIVE_STREAM_BUFFER_ALL_REQUEST]: allRequest,
  [Types.VIDEO_LIVE_STREAM_BUFFER_UPDATE_REQUEST]: updateRequest,
  [Types.VIDEO_LIVE_STREAM_BUFFER_SEARCH_REQUEST]: searchRequest,
  [Types.VIDEO_LIVE_STREAM_BUFFER_DELETE_REQUEST]: deleteRequest,

  [Types.VIDEO_LIVE_STREAM_BUFFER_SUCCESS]: success,
  [Types.VIDEO_LIVE_STREAM_BUFFER_ALL_SUCCESS]: allSuccess,
  [Types.VIDEO_LIVE_STREAM_BUFFER_UPDATE_SUCCESS]: updateSuccess,
  [Types.VIDEO_LIVE_STREAM_BUFFER_SEARCH_SUCCESS]: searchSuccess,
  [Types.VIDEO_LIVE_STREAM_BUFFER_DELETE_SUCCESS]: deleteSuccess,

  [Types.VIDEO_LIVE_STREAM_BUFFER_FAILURE]: failure,
  [Types.VIDEO_LIVE_STREAM_BUFFER_ALL_FAILURE]: allFailure,
  [Types.VIDEO_LIVE_STREAM_BUFFER_UPDATE_FAILURE]: updateFailure,
  [Types.VIDEO_LIVE_STREAM_BUFFER_SEARCH_FAILURE]: searchFailure,
  [Types.VIDEO_LIVE_STREAM_BUFFER_DELETE_FAILURE]: deleteFailure,
  [Types.VIDEO_LIVE_STREAM_BUFFER_RESET]: reset,
});
