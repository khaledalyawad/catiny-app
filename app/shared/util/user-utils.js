import {imageUrl} from "./image-tools-util";

export class UserUtils
{
  static masterUser2user(masterUser)
  {
    if (!masterUser)
      return null;
    return {
      id: masterUser.uuid,
      userID: masterUser.uuid,
      firstName: masterUser.user.firstName,
      lastName: masterUser.user.lastName,
      email: masterUser.user.email,
      profilePictureURL: imageUrl(masterUser.avatar),
      // stripeCustomerID,
      // phone,
      masterUser,
    }
  }
}