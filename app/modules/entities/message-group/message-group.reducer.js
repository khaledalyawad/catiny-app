import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  messageGroupRequest: ['messageGroupId'],
  messageGroupAllRequest: ['options'],
  messageGroupUpdateRequest: ['messageGroup'],
  messageGroupSearchRequest: ['query'],
  messageGroupDeleteRequest: ['messageGroupId'],

  messageGroupSuccess: ['messageGroup'],
  messageGroupAllSuccess: ['messageGroupList', 'headers'],
  messageGroupUpdateSuccess: ['messageGroup'],
  messageGroupSearchSuccess: ['messageGroupList'],
  messageGroupDeleteSuccess: [],

  messageGroupFailure: ['error'],
  messageGroupAllFailure: ['error'],
  messageGroupUpdateFailure: ['error'],
  messageGroupSearchFailure: ['error'],
  messageGroupDeleteFailure: ['error'],

  messageGroupReset: [],
});

export const MessageGroupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  messageGroup: {id: undefined},
  messageGroupList: [],
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
    messageGroup: INITIAL_STATE.messageGroup,
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
  const {messageGroup} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    messageGroup,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {messageGroupList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    messageGroupList: loadMoreDataWhenScrolled(state.messageGroupList, messageGroupList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {messageGroup} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    messageGroup,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {messageGroupList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    messageGroupList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    messageGroup: INITIAL_STATE.messageGroup,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    messageGroup: INITIAL_STATE.messageGroup,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    messageGroupList: [],
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
    messageGroup: state.messageGroup,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    messageGroup: state.messageGroup,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    messageGroupList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGE_GROUP_REQUEST]: request,
  [Types.MESSAGE_GROUP_ALL_REQUEST]: allRequest,
  [Types.MESSAGE_GROUP_UPDATE_REQUEST]: updateRequest,
  [Types.MESSAGE_GROUP_SEARCH_REQUEST]: searchRequest,
  [Types.MESSAGE_GROUP_DELETE_REQUEST]: deleteRequest,

  [Types.MESSAGE_GROUP_SUCCESS]: success,
  [Types.MESSAGE_GROUP_ALL_SUCCESS]: allSuccess,
  [Types.MESSAGE_GROUP_UPDATE_SUCCESS]: updateSuccess,
  [Types.MESSAGE_GROUP_SEARCH_SUCCESS]: searchSuccess,
  [Types.MESSAGE_GROUP_DELETE_SUCCESS]: deleteSuccess,

  [Types.MESSAGE_GROUP_FAILURE]: failure,
  [Types.MESSAGE_GROUP_ALL_FAILURE]: allFailure,
  [Types.MESSAGE_GROUP_UPDATE_FAILURE]: updateFailure,
  [Types.MESSAGE_GROUP_SEARCH_FAILURE]: searchFailure,
  [Types.MESSAGE_GROUP_DELETE_FAILURE]: deleteFailure,
  [Types.MESSAGE_GROUP_RESET]: reset,
});
