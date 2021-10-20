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

describe('Post Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPostScreen();
  });

  const navigateToPostScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('postEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('postEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('postScreen');
  };

  it('should allow you to create, update, and delete the Post entity', async () => {
    await expect(element(by.id('postScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('postEditScrollView');
    await scrollTo('uuidInput', 'postEditScrollView');
    await element(by.id('uuidInput')).replaceText('ea821002-d8eb-45ec-b16e-1a50c2f217ba');
    await scrollTo('postInTypeInput', 'postEditScrollView');
    await setPickerValue('postInTypeInput', 'USER');
    await scrollTo('postTypeInput', 'postEditScrollView');
    await setPickerValue('postTypeInput', 'ADVANCE');
    await scrollTo('contentInput', 'postEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await scrollTo('searchFieldInput', 'postEditScrollView');
    await element(by.id('searchFieldInput')).replaceText('long-text-blob-content');
    await element(by.id('postEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('postDetailScrollView');
    await scrollTo('uuid', 'postDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ea821002-d8eb-45ec-b16e-1a50c2f217ba');
    await scrollTo('postInType', 'postDetailScrollView');
    await expect(element(by.id('postInType'))).toHaveLabel('USER');
    await scrollTo('postType', 'postDetailScrollView');
    await expect(element(by.id('postType'))).toHaveLabel('ADVANCE');
    await scrollTo('content', 'postDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');
    await scrollTo('searchField', 'postDetailScrollView');
    await expect(element(by.id('searchField'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('postEditButton', 'postDetailScrollView');
    await tapFirstElementByLabel('Post Edit Button');
    await waitForElementToBeVisibleById('postEditScrollView');
    await scrollTo('uuidInput', 'postEditScrollView');
    await element(by.id('uuidInput')).replaceText('ea821002-d8eb-45ec-b16e-1a50c2f217ba');
    await scrollTo('postInTypeInput', 'postEditScrollView');
    await setPickerValue('postInTypeInput', 'GROUP');
    await scrollTo('postTypeInput', 'postEditScrollView');
    await setPickerValue('postTypeInput', 'ADVANCE');
    await scrollTo('contentInput', 'postEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await scrollTo('searchFieldInput', 'postEditScrollView');
    await element(by.id('searchFieldInput')).replaceText('long-text-blob-content-2');
    await element(by.id('postEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'postEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('postDetailScrollView');
    await scrollTo('uuid', 'postDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ea821002-d8eb-45ec-b16e-1a50c2f217ba');
    await scrollTo('postInType', 'postDetailScrollView');
    await expect(element(by.id('postInType'))).toHaveLabel('GROUP');
    await scrollTo('postType', 'postDetailScrollView');
    await expect(element(by.id('postType'))).toHaveLabel('ADVANCE');
    await scrollTo('content', 'postDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('searchField', 'postDetailScrollView');
    await expect(element(by.id('searchField'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('postDeleteButton', 'postDetailScrollView');
    await waitThenTapButton('postDeleteButton');
    await waitForElementToBeVisibleById('postDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('postScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
