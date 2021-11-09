import {call, put} from 'redux-saga/effects';
import {callApi} from '../../../shared/sagas/call-api.saga';
import RankGroupActions from './rank-group.reducer';

function* getRankGroup(api, action)
{
  const {rankGroupId} = action;
  // make the call to the api
  const apiCall = call(api.getRankGroup, rankGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(RankGroupActions.rankGroupSuccess(response.data));
  }
  else
  {
    yield put(RankGroupActions.rankGroupFailure(response.data));
  }
}

function* getAllRankGroups(api, action)
{
  const {options} = action;
  // make the call to the api
  const apiCall = call(api.getAllRankGroups, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(RankGroupActions.rankGroupAllSuccess(response.data, response.headers));
  }
  else
  {
    yield put(RankGroupActions.rankGroupAllFailure(response.data));
  }
}

function* updateRankGroup(api, action)
{
  const {rankGroup} = action;
  // make the call to the api
  const idIsNotNull = !(rankGroup.id === null || rankGroup.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateRankGroup : api.createRankGroup, rankGroup);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(RankGroupActions.rankGroupUpdateSuccess(response.data));
  }
  else
  {
    yield put(RankGroupActions.rankGroupUpdateFailure(response.data));
  }
}

function* searchRankGroups(api, action)
{
  const {query} = action;
  // make the call to the api
  const apiCall = call(api.searchRankGroups, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(RankGroupActions.rankGroupSearchSuccess(response.data));
  }
  else
  {
    yield put(RankGroupActions.rankGroupSearchFailure(response.data));
  }
}

function* deleteRankGroup(api, action)
{
  const {rankGroupId} = action;
  // make the call to the api
  const apiCall = call(api.deleteRankGroup, rankGroupId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok)
  {
    yield put(RankGroupActions.rankGroupDeleteSuccess());
  }
  else
  {
    yield put(RankGroupActions.rankGroupDeleteFailure(response.data));
  }
}

export default {
  getAllRankGroups,
  getRankGroup,
  deleteRankGroup,
  searchRankGroups,
  updateRankGroup,
};
