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

describe('PostLike Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPostLikeScreen();
  });

  const navigateToPostLikeScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('postLikeEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('postLikeEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('postLikeScreen');
  };

  it('should allow you to create, update, and delete the PostLike entity', async () => {
    await expect(element(by.id('postLikeScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('postLikeEditScrollView');
    await scrollTo('uuidInput', 'postLikeEditScrollView');
    await element(by.id('uuidInput')).replaceText('d71e0145-3652-4384-814b-63edcc627939');
    await element(by.id('postLikeEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postLikeEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('postLikeDetailScrollView');
    await scrollTo('uuid', 'postLikeDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('d71e0145-3652-4384-814b-63edcc627939');

    // update
    await scrollTo('postLikeEditButton', 'postLikeDetailScrollView');
    await tapFirstElementByLabel('PostLike Edit Button');
    await waitForElementToBeVisibleById('postLikeEditScrollView');
    await scrollTo('uuidInput', 'postLikeEditScrollView');
    await element(by.id('uuidInput')).replaceText('d71e0145-3652-4384-814b-63edcc627939');
    await element(by.id('postLikeEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postLikeEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('postLikeDetailScrollView');
    await scrollTo('uuid', 'postLikeDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('d71e0145-3652-4384-814b-63edcc627939');

    // delete
    await scrollTo('postLikeDeleteButton', 'postLikeDetailScrollView');
    await waitThenTapButton('postLikeDeleteButton');
    await waitForElementToBeVisibleById('postLikeDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('postLikeScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
