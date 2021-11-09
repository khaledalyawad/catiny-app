import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import ImageActions from './image.reducer';

function* getImage(api, action)
{
  const {imageId} = action;
  // make the call to the api
  const apiCall = call(api.getImage, imageId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(ImageActions.imageSuccess(response.data));
  }
  else
  {
    yield put(ImageActions.imageFailure(response.data));
  }
}

function* getAllImages(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllImages, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(ImageActions.imageAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(ImageActions.imageAllFailure(response.data));
  }
}

function* updateImage(api, action)
{
  const {image} = action;
  // make the call to the api
  const idIsNotNull = !(image.id === null || image.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateImage : api.createImage, image);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(ImageActions.imageUpdateSuccess(response.data));
  }
  else
  {
    yield put(ImageActions.imageUpdateFailure(response.data));
  }
}

function* searchImages(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchImages, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(ImageActions.imageSearchSuccess(response.data));
  }
  else
  {
    yield put(ImageActions.imageSearchFailure(response.data));
  }
}

function* deleteImage(api, action)
{
  const {imageId} = action;
  // make the call to the api
  const apiCall = call(api.deleteImage, imageId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(ImageActions.imageDeleteSuccess());
  }
  else
  {
    yield put(ImageActions.imageDeleteFailure(response.data));
  }
}

export default {
  getAllImages,
  getImage,
  deleteImage,
  searchImages,
  updateImage,
};
