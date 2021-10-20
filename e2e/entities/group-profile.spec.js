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

describe('GroupProfile Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToGroupProfileScreen();
  });

  const navigateToGroupProfileScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('groupProfileEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('groupProfileEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('groupProfileScreen');
  };

  it('should allow you to create, update, and delete the GroupProfile entity', async () => {
    await expect(element(by.id('groupProfileScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('groupProfileEditScrollView');
    await scrollTo('uuidInput', 'groupProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('bcdb7a0a-e367-42cc-a1ca-1315864df72f');
    await element(by.id('groupProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'groupProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('groupProfileDetailScrollView');
    await scrollTo('uuid', 'groupProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('bcdb7a0a-e367-42cc-a1ca-1315864df72f');

    // update
    await scrollTo('groupProfileEditButton', 'groupProfileDetailScrollView');
    await tapFirstElementByLabel('GroupProfile Edit Button');
    await waitForElementToBeVisibleById('groupProfileEditScrollView');
    await scrollTo('uuidInput', 'groupProfileEditScrollView');
    await element(by.id('uuidInput')).replaceText('bcdb7a0a-e367-42cc-a1ca-1315864df72f');
    await element(by.id('groupProfileEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'groupProfileEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('groupProfileDetailScrollView');
    await scrollTo('uuid', 'groupProfileDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('bcdb7a0a-e367-42cc-a1ca-1315864df72f');

    // delete
    await scrollTo('groupProfileDeleteButton', 'groupProfileDetailScrollView');
    await waitThenTapButton('groupProfileDeleteButton');
    await waitForElementToBeVisibleById('groupProfileDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('groupProfileScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
