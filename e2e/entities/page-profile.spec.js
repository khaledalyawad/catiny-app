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

describe('PageProfile Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPageProfileScreen();
  });

  const navigateToPageProfileScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('pageProfileEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('pageProfileEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('pageProfileScreen');
  };

  it('should allow you to create, update, and delete the PageProfile entity', async () => {
    await expect(element(by.id('pageProfileScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('pageProfileEditScrollView');
    await scrollTo('uuidInput', 'pageProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('48fc7af3-7399-4269-9811-4f8913750266');
    await element(by.id('pageProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'pageProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('pageProfileDetailScrollView');
    await scrollTo('uuid', 'pageProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('48fc7af3-7399-4269-9811-4f8913750266');

    // update
    await scrollTo('pageProfileEditButton', 'pageProfileDetailScrollView');
    await tapFirstElementByLabel('PageProfile Edit Button');
    await waitForElementToBeVisibleById('pageProfileEditScrollView');
    await scrollTo('uuidInput', 'pageProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('48fc7af3-7399-4269-9811-4f8913750266');
    await element(by.id('pageProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'pageProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('pageProfileDetailScrollView');
    await scrollTo('uuid', 'pageProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('48fc7af3-7399-4269-9811-4f8913750266');

    // delete
    await scrollTo('pageProfileDeleteButton', 'pageProfileDetailScrollView');
    await waitThenTapButton('pageProfileDeleteButton');
    await waitForElementToBeVisibleById('pageProfileDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('pageProfileScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
