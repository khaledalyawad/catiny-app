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

describe('MessageGroup Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToMessageGroupScreen();
  });

  const navigateToMessageGroupScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('messageGroupEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('messageGroupEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('messageGroupScreen');
  };

  it('should allow you to create, update, and delete the MessageGroup entity', async () => {
    await expect(element(by.id('messageGroupScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('messageGroupEditScrollView');
    await scrollTo('uuidInput', 'messageGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('1fd46178-1d83-4eec-89ed-8f4de24aff55');
    await scrollTo('groupNameInput', 'messageGroupEditScrollView');
    await element(by.id('groupNameInput')).replaceText('Home ROI reinvent');
    await scrollTo('avatarInput', 'messageGroupEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await scrollTo('addByInput', 'messageGroupEditScrollView');
    await element(by.id('addByInput')).replaceText('Central parse functionalities');
    await element(by.id('messageGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'messageGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('messageGroupDetailScrollView');
    await scrollTo('uuid', 'messageGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('1fd46178-1d83-4eec-89ed-8f4de24aff55');
    await scrollTo('groupName', 'messageGroupDetailScrollView');
    await expect(element(by.id('groupName'))).toHaveLabel('Home ROI reinvent');
    await scrollTo('avatar', 'messageGroupDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');
    await scrollTo('addBy', 'messageGroupDetailScrollView');
    await expect(element(by.id('addBy'))).toHaveLabel('Central parse functionalities');

    // update
    await scrollTo('messageGroupEditButton', 'messageGroupDetailScrollView');
    await tapFirstElementByLabel('MessageGroup Edit Button');
    await waitForElementToBeVisibleById('messageGroupEditScrollView');
    await scrollTo('uuidInput', 'messageGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('1fd46178-1d83-4eec-89ed-8f4de24aff55');
    await scrollTo('groupNameInput', 'messageGroupEditScrollView');
    await element(by.id('groupNameInput')).replaceText('Home ROI reinvent');
    await scrollTo('avatarInput', 'messageGroupEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await scrollTo('addByInput', 'messageGroupEditScrollView');
    await element(by.id('addByInput')).replaceText('Central parse functionalities');
    await element(by.id('messageGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'messageGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('messageGroupDetailScrollView');
    await scrollTo('uuid', 'messageGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('1fd46178-1d83-4eec-89ed-8f4de24aff55');
    await scrollTo('groupName', 'messageGroupDetailScrollView');
    await expect(element(by.id('groupName'))).toHaveLabel('Home ROI reinvent');
    await scrollTo('avatar', 'messageGroupDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('addBy', 'messageGroupDetailScrollView');
    await expect(element(by.id('addBy'))).toHaveLabel('Central parse functionalities');

    // delete
    await scrollTo('messageGroupDeleteButton', 'messageGroupDetailScrollView');
    await waitThenTapButton('messageGroupDeleteButton');
    await waitForElementToBeVisibleById('messageGroupDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('messageGroupScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
