const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setPickerValue,
  scrollTo,
} = require('../utils');

describe('Friend Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFriendScreen();
  });

  const navigateToFriendScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('friendEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('friendEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('friendScreen');
  };

  it('should allow you to create, update, and delete the Friend entity', async () => {
    await expect(element(by.id('friendScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('friendEditScrollView');
    await scrollTo('uuidInput', 'friendEditScrollView');
    await element(by.id('uuidInput')).replaceText('4cadb4ab-d8cb-4b56-b9ad-4d3c59c386ae');
    await scrollTo('friendTypeInput', 'friendEditScrollView');
    await setPickerValue('friendTypeInput', 'BEST_FRIEND');
    await element(by.id('friendEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'friendEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('friendDetailScrollView');
    await scrollTo('uuid', 'friendDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4cadb4ab-d8cb-4b56-b9ad-4d3c59c386ae');
    await scrollTo('friendType', 'friendDetailScrollView');
    await expect(element(by.id('friendType'))).toHaveLabel('BEST_FRIEND');

    // update
    await scrollTo('friendEditButton', 'friendDetailScrollView');
    await tapFirstElementByLabel('Friend Edit Button');
    await waitForElementToBeVisibleById('friendEditScrollView');
    await scrollTo('uuidInput', 'friendEditScrollView');
    await element(by.id('uuidInput')).replaceText('4cadb4ab-d8cb-4b56-b9ad-4d3c59c386ae');
    await scrollTo('friendTypeInput', 'friendEditScrollView');
    await setPickerValue('friendTypeInput', 'BLOCK');
    await element(by.id('friendEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'friendEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('friendDetailScrollView');
    await scrollTo('uuid', 'friendDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4cadb4ab-d8cb-4b56-b9ad-4d3c59c386ae');
    await scrollTo('friendType', 'friendDetailScrollView');
    await expect(element(by.id('friendType'))).toHaveLabel('BLOCK');

    // delete
    await scrollTo('friendDeleteButton', 'friendDetailScrollView');
    await waitThenTapButton('friendDeleteButton');
    await waitForElementToBeVisibleById('friendDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('friendScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
