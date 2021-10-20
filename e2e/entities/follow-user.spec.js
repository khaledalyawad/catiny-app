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

describe('FollowUser Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFollowUserScreen();
  });

  const navigateToFollowUserScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('followUserEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('followUserEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('followUserScreen');
  };

  it('should allow you to create, update, and delete the FollowUser entity', async () => {
    await expect(element(by.id('followUserScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('followUserEditScrollView');
    await scrollTo('uuidInput', 'followUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('b179af86-ba59-49d4-97ae-c5a988677ff1');
    await element(by.id('followUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('followUserDetailScrollView');
    await scrollTo('uuid', 'followUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('b179af86-ba59-49d4-97ae-c5a988677ff1');

    // update
    await scrollTo('followUserEditButton', 'followUserDetailScrollView');
    await tapFirstElementByLabel('FollowUser Edit Button');
    await waitForElementToBeVisibleById('followUserEditScrollView');
    await scrollTo('uuidInput', 'followUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('b179af86-ba59-49d4-97ae-c5a988677ff1');
    await element(by.id('followUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('followUserDetailScrollView');
    await scrollTo('uuid', 'followUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('b179af86-ba59-49d4-97ae-c5a988677ff1');

    // delete
    await scrollTo('followUserDeleteButton', 'followUserDetailScrollView');
    await waitThenTapButton('followUserDeleteButton');
    await waitForElementToBeVisibleById('followUserDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('followUserScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
