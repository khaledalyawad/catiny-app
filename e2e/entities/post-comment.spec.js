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

describe('PostComment Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPostCommentScreen();
  });

  const navigateToPostCommentScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('postCommentEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('postCommentEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('postCommentScreen');
  };

  it('should allow you to create, update, and delete the PostComment entity', async () => {
    await expect(element(by.id('postCommentScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('postCommentEditScrollView');
    await scrollTo('uuidInput', 'postCommentEditScrollView');
    await element(by.id('uuidInput')).replaceText('c92727ef-7b32-44e7-ba1b-32d87aed40e1');
    await scrollTo('contentInput', 'postCommentEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await element(by.id('postCommentEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postCommentEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('postCommentDetailScrollView');
    await scrollTo('uuid', 'postCommentDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c92727ef-7b32-44e7-ba1b-32d87aed40e1');
    await scrollTo('content', 'postCommentDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('postCommentEditButton', 'postCommentDetailScrollView');
    await tapFirstElementByLabel('PostComment Edit Button');
    await waitForElementToBeVisibleById('postCommentEditScrollView');
    await scrollTo('uuidInput', 'postCommentEditScrollView');
    await element(by.id('uuidInput')).replaceText('c92727ef-7b32-44e7-ba1b-32d87aed40e1');
    await scrollTo('contentInput', 'postCommentEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await element(by.id('postCommentEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postCommentEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('postCommentDetailScrollView');
    await scrollTo('uuid', 'postCommentDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c92727ef-7b32-44e7-ba1b-32d87aed40e1');
    await scrollTo('content', 'postCommentDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('postCommentDeleteButton', 'postCommentDetailScrollView');
    await waitThenTapButton('postCommentDeleteButton');
    await waitForElementToBeVisibleById('postCommentDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('postCommentScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
