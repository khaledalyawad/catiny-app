/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import { mockData } from './localData';
import configureStore from '../../../../../shared/reducers';
import LoginActions from '../../../../../modules/login/login.reducer';
import api from '../../../../../shared/services';
import ForgotPasswordActions from '../../../../../modules/account/password-reset/forgot-password.reducer';
import { imageUrl } from '../../../../../shared/util/image-tools-util';
import { authAPI } from '../../../../api';
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

const store = configureStore();
/**
 * A method that logs the user into his account
 * Parameters
 * @username - The user's username
 * @password - The user's password
 *
 * returns a promise that resolves to user data
 **/
const loginWithEmailAndPassword = (email, password) => {
  return new Promise(async function (resolve, reject) {
    api.getCurrentMasterUser().then((response) => {
      if (!response.error) {
        const masterUser = response?.data;
        resolve({
          user: {
            ...mockData,
            id: masterUser.uuid,
            userID: masterUser.uuid,
            firstName: masterUser.user.firstName,
            lastName: masterUser.user.lastName,
            email: masterUser.user.email,
            profilePictureURL: imageUrl(masterUser.avatar),
          },
        });
      } else {
        store.dispatch(LoginActions.loginFailure(response));
        resolve({ error: response.error });
      }
    });

    // authAPI.loginWithEmailAndPassword(email, password).then((response) => {
    //   if (!response.error) {
    //     handleSuccessfulLogin({ ...response.user }, false).then((res) => {
    //       // Login successful, push token stored, login credential persisted, so we log the user in.
    //       resolve({ user: res.user });
    //     });
    //   } else resolve({ error: response.error });
    // });
    // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
    // resolve({ user: mockData });
  });
};

/**
 * A method that creates a new user using email and password
 * Parameters
 * @userDetails - The user details submitted by the user
 * format of userDetials:
 * const userDetails = {
 *     id,
 *     userID,
 *     stripeCustomerID,
 *     phone,
 *     email,
 *     firstName,
 *     lastName,
 *     profilePictureURL,
 *     ...
 *  };
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 *
 * returns a promise that resolves to user data
 **/
const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  return new Promise(function (resolve, _reject) {
    resolve({ user: mockData });
    // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};

/**
 * Registers users using Facebook gateway
 *
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 * returns a promise that resolves to user data
 **/
const loginOrSignUpWithFacebook = (appConfig) => {
  return new Promise(function (resolve, _reject) {
    resolve({ user: mockData });
    // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};

/**
 * A method that creates a new user using facebook gateway
 *
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 *
 * returns a promise that resolves to user data
 **/
const loginOrSignUpWithApple = () => {
  return new Promise(function (resolve, _reject) {
    resolve({ user: mockData });
    // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};

/**
 * Send out a password reset to the user's email
 * Parameters
 * @email - The user's email
 *
 * returns a promise that resolves to user data
 **/
const sendPasswordResetEmail = (email) => {
  return new Promise(function (resolve, reject) {
    store.dispatch(ForgotPasswordActions.forgotPasswordRequest(email));
    resolve({});
    // if (store.getState().forgotPassword.response) resolve({ data: store.getState().forgotPassword.response });
    // reject({ data: store.getState().forgotPassword.error });
  });
};

/**
 * Login using the SMS code
 *
 * returns a promise that resolves to user data
 **/
const loginWithSMSCode = () => {
  return new Promise(function (resolve, _reject) {
    resolve({ user: mockData });
    // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};

/*
 ** Logout out of the app
 **
 ** returns a promise that resolves to user data
 */
const logout = () => {
  return new Promise((resolve) => {
    store.dispatch(LoginActions.logoutRequest());
    resolve(null);
  });
};

const retrievePersistedAuthUser = () => {
  return new Promise((resolve) => {
    console.log(store.getState().account);
    resolve(null);
  });
};

const validateUsernameFieldIfNeeded = (inputFields, appConfig) => {
  return new Promise((resolve, reject) => {
    resolve({ success: true });

    // Error format:
    // resolve({ error: IMLocalized('Invalid username') });
  });
};

/**Deletes the user account
 *
 * @param {string} userId strting of the current user
 * @param {function} callback A callback to be called after the delete operation has finished
 */
const deleteUser = (userID, callback) => {
  // calls the removeUser from the auth API
};

const handleSuccessfulLogin = (user, accountCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  fetchAndStoreExtraInfoUponLogin(user, accountCreated);

  return new Promise((resolve) => {
    resolve({ user: { ...user } });
  });
};

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
  authAPI.fetchAndStorePushTokenIfPossible(user);

  getCurrentLocation(Geolocation).then(async (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    var locationData = {};
    if (location) {
      locationData = {
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      };
      if (accountCreated) {
        locationData = {
          ...locationData,
          signUpLocation: {
            latitude: latitude,
            longitude: longitude,
          },
        };
      }
    }

    const userData = {
      ...locationData,
      isOnline: true,
    };

    authAPI.updateUser(user.id || user.userID, userData);
  });
};

const getCurrentLocation = (geolocation) => {
  return new Promise(async (resolve) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      resolve({ coords: { latitude: '', longitude: '' } });
      return;
    }

    geolocation.getCurrentPosition(
      (location) => {
        console.log(location);
        resolve(location);
      },
      (error) => {
        console.log(error);
      },
    );

    // setRegion(location.coords);
    // onLocationChange(location.coords);

    // geolocation.getCurrentPosition(
    //     resolve,
    //     () => resolve({ coords: { latitude: "", longitude: "" } }),
    //     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    // );
  });
};

const localAuthManager = {
  loginWithEmailAndPassword,
  createAccountWithEmailAndPassword,
  loginOrSignUpWithFacebook,
  loginOrSignUpWithApple,
  loginWithSMSCode,
  sendPasswordResetEmail,
  logout,
  retrievePersistedAuthUser,
  validateUsernameFieldIfNeeded,
  deleteUser,
};

export default localAuthManager;
