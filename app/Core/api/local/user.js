/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import {mockData} from '../../onboarding/utils/api/local/localData';
import {getMasterUser} from "../../../graphql/user.query";
import {imageUrl} from "../../../shared/util/image-tools-util";

/**Get user data
 *
 * @param {String} userId the user id of the current user
 */
export const getUserData = async (userId) =>
{
  // fetch user data from the database
  // return { data: { ...user.data(), id: user.id }, success: true }; if successful
  //   or
  // return {
  //   error: 'Oops! an error occurred. Please try again',
  //   success: false,
  // };
  return getMasterUser(userId)
    .then(({data}) =>
    {
      const masterUser = data.data.masterUser;
      return {
        data: {
          id: masterUser.uuid,
          userID: masterUser.uuid,
          firstName: masterUser.user.firstName,
          lastName: masterUser.user.lastName,
          email: masterUser.user.email,
          profilePictureURL: imageUrl(masterUser.avatar),
          // stripeCustomerID,
          // phone,
          masterUser,
        },
        success: true
      };
    })
    .catch(error => ({
      error: 'Oops! an error occurred. Please try again',
      success: false,
    }));
};

/**
 * Update user data
 *
 * @param {String} userId the id of the current user
 * @param {String} userData the user Data of the current user
 */
export const updateUserData = async (userId, userData) =>
{
  // update user data on tthe database
  // return { success: true };
  // or
  // return { error, success: false };
  return {success: true};
};

/**
 * Subscribe to users
 *
 * @param {function} callback a callback that is called when the user data changes on the users backend
 */
export const subscribeUsers = (callback) =>
{
  const ref = null; // object that will  be used to unsubscribed from the listener
  // listener always call callback(users) whenever there's a change in the user table
  callback([mockData]);
  return ref; //this object unsubscribes from the event
};

/**
 * Subscribe to the changes on current users' data
 *
 * @param {String} userId the user id
 * @param {function} callback a callback that is called when the user data changes on the users backend
 */
export const subscribeCurrentUser = (userId, callback) =>
{
  const ref = null; //object that will  be used to unsubscribed from the listener
  // listener always call callback(users) whenever there's a change in the user table
  callback([mockData]);
  return ref; //this object unsubscribes from the event
};
