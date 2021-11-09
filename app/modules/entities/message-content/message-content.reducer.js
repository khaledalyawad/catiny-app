import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  messageContentRequest: ['messageContentId'],
  messageContentAllRequest: ['options'],
  messageContentUpdateRequest: ['messageContent'],
  messageContentSearchRequest: ['query'],
  messageContentDeleteRequest: ['messageContentId'],

  messageContentSuccess: ['messageContent'],
  messageContentAllSuccess: ['messageContentList', 'headers'],
  messageContentUpdateSuccess: ['messageContent'],
  messageContentSearchSuccess: ['messageContentList'],
  messageContentDeleteSuccess: [],

  messageContentFailure: ['error'],
  messageContentAllFailure: ['error'],
  messageContentUpdateFailure: ['error'],
  messageContentSearchFailure: ['error'],
  messageContentDeleteFailure: ['error'],

  messageContentReset: [],
});

export const MessageContentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  messageContent: {id: undefined},
  messageContentList: [],
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
    messageContent: INITIAL_STATE.messageContent,
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
  const {messageContent} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    messageContent,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {messageContentList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    messageContentList: loadMoreDataWhenScrolled(state.messageContentList, messageContentList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {messageContent} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    messageContent,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {messageContentList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    messageContentList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    messageContent: INITIAL_STATE.messageContent,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    messageContent: INITIAL_STATE.messageContent,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    messageContentList: [],
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
    messageContent: state.messageContent,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    messageContent: state.messageContent,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    messageContentList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGE_CONTENT_REQUEST]: request,
  [Types.MESSAGE_CONTENT_ALL_REQUEST]: allRequest,
  [Types.MESSAGE_CONTENT_UPDATE_REQUEST]: updateRequest,
  [Types.MESSAGE_CONTENT_SEARCH_REQUEST]: searchRequest,
  [Types.MESSAGE_CONTENT_DELETE_REQUEST]: deleteRequest,

  [Types.MESSAGE_CONTENT_SUCCESS]: success,
  [Types.MESSAGE_CONTENT_ALL_SUCCESS]: allSuccess,
  [Types.MESSAGE_CONTENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.MESSAGE_CONTENT_SEARCH_SUCCESS]: searchSuccess,
  [Types.MESSAGE_CONTENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.MESSAGE_CONTENT_FAILURE]: failure,
  [Types.MESSAGE_CONTENT_ALL_FAILURE]: allFailure,
  [Types.MESSAGE_CONTENT_UPDATE_FAILURE]: updateFailure,
  [Types.MESSAGE_CONTENT_SEARCH_FAILURE]: searchFailure,
  [Types.MESSAGE_CONTENT_DELETE_FAILURE]: deleteFailure,
  [Types.MESSAGE_CONTENT_RESET]: reset,
});
