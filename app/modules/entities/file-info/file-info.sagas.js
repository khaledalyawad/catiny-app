import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import FileInfoActions from './file-info.reducer';

function* getFileInfo(api, action)
{
  const {fileInfoId} = action;
  // make the call to the api
  const apiCall = call(api.getFileInfo, fileInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FileInfoActions.fileInfoSuccess(response.data));
  }
  else
  {
    yield put(FileInfoActions.fileInfoFailure(response.data));
  }
}

function* getAllFileInfos(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllFileInfos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FileInfoActions.fileInfoAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(FileInfoActions.fileInfoAllFailure(response.data));
  }
}

function* updateFileInfo(api, action)
{
  const {fileInfo} = action;
  // make the call to the api
  const idIsNotNull = !(fileInfo.id === null || fileInfo.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFileInfo : api.createFileInfo, fileInfo);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FileInfoActions.fileInfoUpdateSuccess(response.data));
  }
  else
  {
    yield put(FileInfoActions.fileInfoUpdateFailure(response.data));
  }
}

function* searchFileInfos(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchFileInfos, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FileInfoActions.fileInfoSearchSuccess(response.data));
  }
  else
  {
    yield put(FileInfoActions.fileInfoSearchFailure(response.data));
  }
}

function* deleteFileInfo(api, action)
{
  const {fileInfoId} = action;
  // make the call to the api
  const apiCall = call(api.deleteFileInfo, fileInfoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(FileInfoActions.fileInfoDeleteSuccess());
  }
  else
  {
    yield put(FileInfoActions.fileInfoDeleteFailure(response.data));
  }
}

export default {
  getAllFileInfos,
  getFileInfo,
  deleteFileInfo,
  searchFileInfos,
  updateFileInfo,
};
