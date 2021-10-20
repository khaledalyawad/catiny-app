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

describe('GroupPost Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToGroupPostScreen();
  });

  const navigateToGroupPostScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('groupPostEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('groupPostEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('groupPostScreen');
  };

  it('should allow you to create, update, and delete the GroupPost entity', async () => {
    await expect(element(by.id('groupPostScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('groupPostEditScrollView');
    await scrollTo('uuidInput', 'groupPostEditScrollView');
    await element(by.id('uuidInput')).replaceText('e913badc-b9f8-4f62-b516-bda808bd83a7');
    await scrollTo('nameInput', 'groupPostEditScrollView');
    await element(by.id('nameInput')).replaceText('Panama Brand Well');
    await scrollTo('avatarInput', 'groupPostEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await scrollTo('quickInfoInput', 'groupPostEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content');
    await element(by.id('groupPostEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'groupPostEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('groupPostDetailScrollView');
    await scrollTo('uuid', 'groupPostDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('e913badc-b9f8-4f62-b516-bda808bd83a7');
    await scrollTo('name', 'groupPostDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Panama Brand Well');
    await scrollTo('avatar', 'groupPostDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');
    await scrollTo('quickInfo', 'groupPostDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('groupPostEditButton', 'groupPostDetailScrollView');
    await tapFirstElementByLabel('GroupPost Edit Button');
    await waitForElementToBeVisibleById('groupPostEditScrollView');
    await scrollTo('uuidInput', 'groupPostEditScrollView');
    await element(by.id('uuidInput')).replaceText('e913badc-b9f8-4f62-b516-bda808bd83a7');
    await scrollTo('nameInput', 'groupPostEditScrollView');
    await element(by.id('nameInput')).replaceText('Panama Brand Well');
    await scrollTo('avatarInput', 'groupPostEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await scrollTo('quickInfoInput', 'groupPostEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content-2');
    await element(by.id('groupPostEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'groupPostEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('groupPostDetailScrollView');
    await scrollTo('uuid', 'groupPostDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('e913badc-b9f8-4f62-b516-bda808bd83a7');
    await scrollTo('name', 'groupPostDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Panama Brand Well');
    await scrollTo('avatar', 'groupPostDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('quickInfo', 'groupPostDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('groupPostDeleteButton', 'groupPostDetailScrollView');
    await waitThenTapButton('groupPostDeleteButton');
    await waitForElementToBeVisibleById('groupPostDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('groupPostScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
