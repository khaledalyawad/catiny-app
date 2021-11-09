import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  friendRequest: ['friendId'],
  friendAllRequest: ['options'],
  friendUpdateRequest: ['friend'],
  friendSearchRequest: ['query'],
  friendDeleteRequest: ['friendId'],

  friendSuccess: ['friend'],
  friendAllSuccess: ['friendList', 'headers'],
  friendUpdateSuccess: ['friend'],
  friendSearchSuccess: ['friendList'],
  friendDeleteSuccess: [],

  friendFailure: ['error'],
  friendAllFailure: ['error'],
  friendUpdateFailure: ['error'],
  friendSearchFailure: ['error'],
  friendDeleteFailure: ['error'],

  friendReset: [],
});

export const FriendTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  friend: {id: undefined},
  friendList: [],
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
    friend: INITIAL_STATE.friend,
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
  const {friend} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    friend,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {friendList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    friendList: loadMoreDataWhenScrolled(state.friendList, friendList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {friend} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    friend,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {friendList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    friendList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    friend: INITIAL_STATE.friend,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    friend: INITIAL_STATE.friend,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    friendList: [],
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
    friend: state.friend,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    friend: state.friend,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    friendList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FRIEND_REQUEST]: request,
  [Types.FRIEND_ALL_REQUEST]: allRequest,
  [Types.FRIEND_UPDATE_REQUEST]: updateRequest,
  [Types.FRIEND_SEARCH_REQUEST]: searchRequest,
  [Types.FRIEND_DELETE_REQUEST]: deleteRequest,

  [Types.FRIEND_SUCCESS]: success,
  [Types.FRIEND_ALL_SUCCESS]: allSuccess,
  [Types.FRIEND_UPDATE_SUCCESS]: updateSuccess,
  [Types.FRIEND_SEARCH_SUCCESS]: searchSuccess,
  [Types.FRIEND_DELETE_SUCCESS]: deleteSuccess,

  [Types.FRIEND_FAILURE]: failure,
  [Types.FRIEND_ALL_FAILURE]: allFailure,
  [Types.FRIEND_UPDATE_FAILURE]: updateFailure,
  [Types.FRIEND_SEARCH_FAILURE]: searchFailure,
  [Types.FRIEND_DELETE_FAILURE]: deleteFailure,
  [Types.FRIEND_RESET]: reset,
});
