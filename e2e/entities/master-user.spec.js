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

describe('MasterUser Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToMasterUserScreen();
  });

  const navigateToMasterUserScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('masterUserEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('masterUserEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('masterUserScreen');
  };

  it('should allow you to create, update, and delete the MasterUser entity', async () => {
    await expect(element(by.id('masterUserScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('masterUserEditScrollView');
    await scrollTo('uuidInput', 'masterUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('31116ae4-b193-4db7-8639-47418fd52e65');
    await scrollTo('fullNameInput', 'masterUserEditScrollView');
    await element(by.id('fullNameInput')).replaceText('analyzer Gloves override');
    await scrollTo('nicknameInput', 'masterUserEditScrollView');
    await element(by.id('nicknameInput')).replaceText('Reactive Sausages Luxembourg');
    await scrollTo('avatarInput', 'masterUserEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await scrollTo('quickInfoInput', 'masterUserEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content');
    await element(by.id('masterUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'masterUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('masterUserDetailScrollView');
    await scrollTo('uuid', 'masterUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('31116ae4-b193-4db7-8639-47418fd52e65');
    await scrollTo('fullName', 'masterUserDetailScrollView');
    await expect(element(by.id('fullName'))).toHaveLabel('analyzer Gloves override');
    await scrollTo('nickname', 'masterUserDetailScrollView');
    await expect(element(by.id('nickname'))).toHaveLabel('Reactive Sausages Luxembourg');
    await scrollTo('avatar', 'masterUserDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');
    await scrollTo('quickInfo', 'masterUserDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('masterUserEditButton', 'masterUserDetailScrollView');
    await tapFirstElementByLabel('MasterUser Edit Button');
    await waitForElementToBeVisibleById('masterUserEditScrollView');
    await scrollTo('uuidInput', 'masterUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('31116ae4-b193-4db7-8639-47418fd52e65');
    await scrollTo('fullNameInput', 'masterUserEditScrollView');
    await element(by.id('fullNameInput')).replaceText('analyzer Gloves override');
    await scrollTo('nicknameInput', 'masterUserEditScrollView');
    await element(by.id('nicknameInput')).replaceText('Reactive Sausages Luxembourg');
    await scrollTo('avatarInput', 'masterUserEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await scrollTo('quickInfoInput', 'masterUserEditScrollView');
    await element(by.id('quickInfoInput')).replaceText('long-text-blob-content-2');
    await element(by.id('masterUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'masterUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('masterUserDetailScrollView');
    await scrollTo('uuid', 'masterUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('31116ae4-b193-4db7-8639-47418fd52e65');
    await scrollTo('fullName', 'masterUserDetailScrollView');
    await expect(element(by.id('fullName'))).toHaveLabel('analyzer Gloves override');
    await scrollTo('nickname', 'masterUserDetailScrollView');
    await expect(element(by.id('nickname'))).toHaveLabel('Reactive Sausages Luxembourg');
    await scrollTo('avatar', 'masterUserDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('quickInfo', 'masterUserDetailScrollView');
    await expect(element(by.id('quickInfo'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('masterUserDeleteButton', 'masterUserDetailScrollView');
    await waitThenTapButton('masterUserDeleteButton');
    await waitForElementToBeVisibleById('masterUserDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('masterUserScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
