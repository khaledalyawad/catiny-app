const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('UserProfile Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToUserProfileScreen();
  });

  const navigateToUserProfileScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('userProfileEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('userProfileEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('userProfileScreen');
  };

  it('should allow you to create, update, and delete the UserProfile entity', async () => {
    await expect(element(by.id('userProfileScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('userProfileEditScrollView');
    await scrollTo('uuidInput', 'userProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('e2464f73-4151-45d8-8d9e-37def1d34759');
    await scrollTo('workInput', 'userProfileEditScrollView');
    await element(by.id('workInput')).replaceText('long-text-blob-content');
    await scrollTo('educationInput', 'userProfileEditScrollView');
    await element(by.id('educationInput')).replaceText('long-text-blob-content');
    await scrollTo('placesLivedInput', 'userProfileEditScrollView');
    await element(by.id('placesLivedInput')).replaceText('long-text-blob-content');
    await scrollTo('contactInfoInput', 'userProfileEditScrollView');
    await element(by.id('contactInfoInput')).replaceText('long-text-blob-content');
    await scrollTo('webSocialLinksInput', 'userProfileEditScrollView');
    await element(by.id('webSocialLinksInput')).replaceText('long-text-blob-content');
    await scrollTo('basicInfoInput', 'userProfileEditScrollView');
    await element(by.id('basicInfoInput')).replaceText('long-text-blob-content');
    await scrollTo('relationshipInfoInput', 'userProfileEditScrollView');
    await element(by.id('relationshipInfoInput')).replaceText('long-text-blob-content');
    await scrollTo('familyInput', 'userProfileEditScrollView');
    await element(by.id('familyInput')).replaceText('long-text-blob-content');
    await scrollTo('detailAboutInput', 'userProfileEditScrollView');
    await element(by.id('detailAboutInput')).replaceText('long-text-blob-content');
    await scrollTo('lifeEventsInput', 'userProfileEditScrollView');
    await element(by.id('lifeEventsInput')).replaceText('long-text-blob-content');
    await scrollTo('hobbiesInput', 'userProfileEditScrollView');
    await element(by.id('hobbiesInput')).replaceText('long-text-blob-content');
    await scrollTo('featuredInput', 'userProfileEditScrollView');
    await element(by.id('featuredInput')).replaceText('long-text-blob-content');
    await element(by.id('userProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'userProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('userProfileDetailScrollView');
    await scrollTo('uuid', 'userProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('e2464f73-4151-45d8-8d9e-37def1d34759');
    await scrollTo('work', 'userProfileDetailScrollView');
    await expect(element(by.id('work'))).toHaveLabel('long-text-blob-content');
    await scrollTo('education', 'userProfileDetailScrollView');
    await expect(element(by.id('education'))).toHaveLabel('long-text-blob-content');
    await scrollTo('placesLived', 'userProfileDetailScrollView');
    await expect(element(by.id('placesLived'))).toHaveLabel('long-text-blob-content');
    await scrollTo('contactInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('contactInfo'))).toHaveLabel('long-text-blob-content');
    await scrollTo('webSocialLinks', 'userProfileDetailScrollView');
    await expect(element(by.id('webSocialLinks'))).toHaveLabel('long-text-blob-content');
    await scrollTo('basicInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('basicInfo'))).toHaveLabel('long-text-blob-content');
    await scrollTo('relationshipInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('relationshipInfo'))).toHaveLabel('long-text-blob-content');
    await scrollTo('family', 'userProfileDetailScrollView');
    await expect(element(by.id('family'))).toHaveLabel('long-text-blob-content');
    await scrollTo('detailAbout', 'userProfileDetailScrollView');
    await expect(element(by.id('detailAbout'))).toHaveLabel('long-text-blob-content');
    await scrollTo('lifeEvents', 'userProfileDetailScrollView');
    await expect(element(by.id('lifeEvents'))).toHaveLabel('long-text-blob-content');
    await scrollTo('hobbies', 'userProfileDetailScrollView');
    await expect(element(by.id('hobbies'))).toHaveLabel('long-text-blob-content');
    await scrollTo('featured', 'userProfileDetailScrollView');
    await expect(element(by.id('featured'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('userProfileEditButton', 'userProfileDetailScrollView');
    await tapFirstElementByLabel('UserProfile Edit Button');
    await waitForElementToBeVisibleById('userProfileEditScrollView');
    await scrollTo('uuidInput', 'userProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('e2464f73-4151-45d8-8d9e-37def1d34759');
    await scrollTo('workInput', 'userProfileEditScrollView');
    await element(by.id('workInput')).replaceText('long-text-blob-content-2');
    await scrollTo('educationInput', 'userProfileEditScrollView');
    await element(by.id('educationInput')).replaceText('long-text-blob-content-2');
    await scrollTo('placesLivedInput', 'userProfileEditScrollView');
    await element(by.id('placesLivedInput')).replaceText('long-text-blob-content-2');
    await scrollTo('contactInfoInput', 'userProfileEditScrollView');
    await element(by.id('contactInfoInput')).replaceText('long-text-blob-content-2');
    await scrollTo('webSocialLinksInput', 'userProfileEditScrollView');
    await element(by.id('webSocialLinksInput')).replaceText('long-text-blob-content-2');
    await scrollTo('basicInfoInput', 'userProfileEditScrollView');
    await element(by.id('basicInfoInput')).replaceText('long-text-blob-content-2');
    await scrollTo('relationshipInfoInput', 'userProfileEditScrollView');
    await element(by.id('relationshipInfoInput')).replaceText('long-text-blob-content-2');
    await scrollTo('familyInput', 'userProfileEditScrollView');
    await element(by.id('familyInput')).replaceText('long-text-blob-content-2');
    await scrollTo('detailAboutInput', 'userProfileEditScrollView');
    await element(by.id('detailAboutInput')).replaceText('long-text-blob-content-2');
    await scrollTo('lifeEventsInput', 'userProfileEditScrollView');
    await element(by.id('lifeEventsInput')).replaceText('long-text-blob-content-2');
    await scrollTo('hobbiesInput', 'userProfileEditScrollView');
    await element(by.id('hobbiesInput')).replaceText('long-text-blob-content-2');
    await scrollTo('featuredInput', 'userProfileEditScrollView');
    await element(by.id('featuredInput')).replaceText('long-text-blob-content-2');
    await element(by.id('userProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'userProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('userProfileDetailScrollView');
    await scrollTo('uuid', 'userProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('e2464f73-4151-45d8-8d9e-37def1d34759');
    await scrollTo('work', 'userProfileDetailScrollView');
    await expect(element(by.id('work'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('education', 'userProfileDetailScrollView');
    await expect(element(by.id('education'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('placesLived', 'userProfileDetailScrollView');
    await expect(element(by.id('placesLived'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('contactInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('contactInfo'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('webSocialLinks', 'userProfileDetailScrollView');
    await expect(element(by.id('webSocialLinks'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('basicInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('basicInfo'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('relationshipInfo', 'userProfileDetailScrollView');
    await expect(element(by.id('relationshipInfo'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('family', 'userProfileDetailScrollView');
    await expect(element(by.id('family'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('detailAbout', 'userProfileDetailScrollView');
    await expect(element(by.id('detailAbout'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('lifeEvents', 'userProfileDetailScrollView');
    await expect(element(by.id('lifeEvents'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('hobbies', 'userProfileDetailScrollView');
    await expect(element(by.id('hobbies'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('featured', 'userProfileDetailScrollView');
    await expect(element(by.id('featured'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('userProfileDeleteButton', 'userProfileDetailScrollView');
    await waitThenTapButton('userProfileDeleteButton');
    await waitForElementToBeVisibleById('userProfileDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('userProfileScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
