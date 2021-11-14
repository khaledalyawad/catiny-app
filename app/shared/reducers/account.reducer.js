import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountRequest: [],
  accountSuccess: ['account'],
  accountFailure: ['error'],
  accountUpdateRequest: ['account'],
  accountUpdateSuccess: [],
  accountUpdateFailure: ['error'],
  accountReset: [],

  accountMasterUserRequest: [],
  accountMasterUserSuccess: ['masterUser'],
  accountMasterUserFailure: ['error'],
});

export const AccountTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  error: null,
  fetching: false,
  updating: false,
  masterUser: null,
});

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({fetching: true});

// we've successfully logged in
export const success = (state, data) =>
{
  const {account} = data;
  return state.merge({fetching: false, error: null, account});
};

// we've had a problem getting the account
export const failure = (state, {error}) => state.merge({fetching: false, updating: false, account: null, error});

export const accountMasterUserRequest = (state) => state.merge();
export const accountMasterUserSuccess = (state, data) => state.merge({masterUser: data.masterUser});
export const accountMasterUserFailure = (state, {error}) => state;

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({updating: true});

// we've successfully updated the account settings
export const updateSuccess = (state) => state.merge({error: null, updating: false});

// we've had a problem updating the account settings
export const updateFailure = (state, {error}) => state.merge({updating: false, error});

// reset the account reducer
export const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_UPDATE_FAILURE]: updateFailure,
  [Types.ACCOUNT_RESET]: reset,
  [Types.ACCOUNT_MASTER_USER_REQUEST]: accountMasterUserRequest,
  [Types.ACCOUNT_MASTER_USER_SUCCESS]: accountMasterUserSuccess,
  [Types.ACCOUNT_MASTER_USER_FAILURE]: accountMasterUserFailure,
});

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = (accountState) => accountState.account !== null;

export const getLogin = (accountState) => (accountState.account !== null ? accountState.account.login : 'anonymoususer');
