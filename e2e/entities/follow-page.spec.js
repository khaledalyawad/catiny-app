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

describe('FollowPage Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFollowPageScreen();
  });

  const navigateToFollowPageScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('followPageEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('followPageEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('followPageScreen');
  };

  it('should allow you to create, update, and delete the FollowPage entity', async () => {
    await expect(element(by.id('followPageScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('followPageEditScrollView');
    await scrollTo('uuidInput', 'followPageEditScrollView');
    await element(by.id('uuidInput')).replaceText('03c634df-0aea-4f9d-a480-8a074084b939');
    await element(by.id('followPageEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followPageEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('followPageDetailScrollView');
    await scrollTo('uuid', 'followPageDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('03c634df-0aea-4f9d-a480-8a074084b939');

    // update
    await scrollTo('followPageEditButton', 'followPageDetailScrollView');
    await tapFirstElementByLabel('FollowPage Edit Button');
    await waitForElementToBeVisibleById('followPageEditScrollView');
    await scrollTo('uuidInput', 'followPageEditScrollView');
    await element(by.id('uuidInput')).replaceText('03c634df-0aea-4f9d-a480-8a074084b939');
    await element(by.id('followPageEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followPageEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('followPageDetailScrollView');
    await scrollTo('uuid', 'followPageDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('03c634df-0aea-4f9d-a480-8a074084b939');

    // delete
    await scrollTo('followPageDeleteButton', 'followPageDetailScrollView');
    await waitThenTapButton('followPageDeleteButton');
    await waitForElementToBeVisibleById('followPageDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('followPageScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
