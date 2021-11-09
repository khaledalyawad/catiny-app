import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {loadMoreDataWhenScrolled} from '../../../shared/util/pagination-utils';
import {parseHeaderForLinks} from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  imageRequest: ['imageId'],
  imageAllRequest: ['options'],
  imageUpdateRequest: ['image'],
  imageSearchRequest: ['query'],
  imageDeleteRequest: ['imageId'],

  imageSuccess: ['image'],
  imageAllSuccess: ['imageList', 'headers'],
  imageUpdateSuccess: ['image'],
  imageSearchSuccess: ['imageList'],
  imageDeleteSuccess: [],

  imageFailure: ['error'],
  imageAllFailure: ['error'],
  imageUpdateFailure: ['error'],
  imageSearchFailure: ['error'],
  imageDeleteFailure: ['error'],

  imageReset: [],
});

export const ImageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  image: {id: undefined},
  imageList: [],
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
    image: INITIAL_STATE.image,
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
  const {image} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    image,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) =>
{
  const {imageList, headers} = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    imageList: loadMoreDataWhenScrolled(state.imageList, imageList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) =>
{
  const {image} = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    image,
  });
};
// successful api search
export const searchSuccess = (state, action) =>
{
  const {imageList} = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    imageList,
  });
};
// successful api delete
export const deleteSuccess = (state) =>
{
  return state.merge({
    deleting: false,
    errorDeleting: null,
    image: INITIAL_STATE.image,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    image: INITIAL_STATE.image,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    imageList: [],
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
    image: state.image,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    image: state.image,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) =>
{
  const {error} = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    imageList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IMAGE_REQUEST]: request,
  [Types.IMAGE_ALL_REQUEST]: allRequest,
  [Types.IMAGE_UPDATE_REQUEST]: updateRequest,
  [Types.IMAGE_SEARCH_REQUEST]: searchRequest,
  [Types.IMAGE_DELETE_REQUEST]: deleteRequest,

  [Types.IMAGE_SUCCESS]: success,
  [Types.IMAGE_ALL_SUCCESS]: allSuccess,
  [Types.IMAGE_UPDATE_SUCCESS]: updateSuccess,
  [Types.IMAGE_SEARCH_SUCCESS]: searchSuccess,
  [Types.IMAGE_DELETE_SUCCESS]: deleteSuccess,

  [Types.IMAGE_FAILURE]: failure,
  [Types.IMAGE_ALL_FAILURE]: allFailure,
  [Types.IMAGE_UPDATE_FAILURE]: updateFailure,
  [Types.IMAGE_SEARCH_FAILURE]: searchFailure,
  [Types.IMAGE_DELETE_FAILURE]: deleteFailure,
  [Types.IMAGE_RESET]: reset,
});
