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

describe('PagePost Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPagePostScreen();
  });

  const navigateToPagePostScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('pagePostEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('pagePostEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('pagePostScreen');
  };

  it('should allow you to create, update, and delete the PagePost entity', async () => {
    await expect(element(by.id('pagePostScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('pagePostEditScrollView');
    await scrollTo('uuidInput', 'pagePostEditScrollView');
    await element(by.id('uuidInput')).replaceText('ef662942-f9f2-4437-b8e2-98ddc61516e6');
    await scrollTo('nameInput', 'pagePostEditScrollView');
    await element(by.id('nameInput')).replaceText('Regional');
    await scrollTo('avatarInput', 'pagePostEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await scrollTo('quickInfoInput', 'pagePostEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content');
    await element(by.id('pagePostEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'pagePostEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('pagePostDetailScrollView');
    await scrollTo('uuid', 'pagePostDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ef662942-f9f2-4437-b8e2-98ddc61516e6');
    await scrollTo('name', 'pagePostDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Regional');
    await scrollTo('avatar', 'pagePostDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');
    await scrollTo('quickInfo', 'pagePostDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('pagePostEditButton', 'pagePostDetailScrollView');
    await tapFirstElementByLabel('PagePost Edit Button');
    await waitForElementToBeVisibleById('pagePostEditScrollView');
    await scrollTo('uuidInput', 'pagePostEditScrollView');
    await element(by.id('uuidInput')).replaceText('ef662942-f9f2-4437-b8e2-98ddc61516e6');
    await scrollTo('nameInput', 'pagePostEditScrollView');
    await element(by.id('nameInput')).replaceText('Regional');
    await scrollTo('avatarInput', 'pagePostEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await scrollTo('quickInfoInput', 'pagePostEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content-2');
    await element(by.id('pagePostEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'pagePostEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('pagePostDetailScrollView');
    await scrollTo('uuid', 'pagePostDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ef662942-f9f2-4437-b8e2-98ddc61516e6');
    await scrollTo('name', 'pagePostDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Regional');
    await scrollTo('avatar', 'pagePostDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('quickInfo', 'pagePostDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('pagePostDeleteButton', 'pagePostDetailScrollView');
    await waitThenTapButton('pagePostDeleteButton');
    await waitForElementToBeVisibleById('pagePostDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('pagePostScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
