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

describe('VideoLiveStreamBuffer Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToVideoLiveStreamBufferScreen();
  });

  const navigateToVideoLiveStreamBufferScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('videoLiveStreamBufferEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('videoLiveStreamBufferEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('videoLiveStreamBufferScreen');
  };

  it('should allow you to create, update, and delete the VideoLiveStreamBuffer entity', async () => {
    await expect(element(by.id('videoLiveStreamBufferScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('videoLiveStreamBufferEditScrollView');
    await scrollTo('uuidInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('uuidInput')).replaceText('29a014d4-15b1-4de9-954f-b7df2b7dc241');
    await scrollTo('bufferDataInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferDataInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await scrollTo('bufferDataContentTypeInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferDataContentTypeInput')).replaceText('image/gif');
    await scrollTo('bufferNumberInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferNumberInput')).replaceText('56631');
    await scrollTo('pathInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('pathInput')).replaceText('Secured withdrawal port');
    await element(by.id('videoLiveStreamBufferEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoLiveStreamBufferEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('videoLiveStreamBufferDetailScrollView');
    await scrollTo('uuid', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('29a014d4-15b1-4de9-954f-b7df2b7dc241');
    await scrollTo('bufferData', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('bufferData'))).toBeVisible();
    await scrollTo('bufferNumber', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('bufferNumber'))).toHaveLabel('56631');
    await scrollTo('path', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('Secured withdrawal port');

    // update
    await scrollTo('videoLiveStreamBufferEditButton', 'videoLiveStreamBufferDetailScrollView');
    await tapFirstElementByLabel('VideoLiveStreamBuffer Edit Button');
    await waitForElementToBeVisibleById('videoLiveStreamBufferEditScrollView');
    await scrollTo('uuidInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('uuidInput')).replaceText('29a014d4-15b1-4de9-954f-b7df2b7dc241');
    await scrollTo('bufferDataInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferDataInput')).replaceText('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    await scrollTo('bufferDataContentTypeInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferDataContentTypeInput')).replaceText('image/gif');
    await scrollTo('bufferNumberInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('bufferNumberInput')).replaceText('87322');
    await scrollTo('pathInput', 'videoLiveStreamBufferEditScrollView');
    await element(by.id('pathInput')).replaceText('Secured withdrawal port');
    await element(by.id('videoLiveStreamBufferEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoLiveStreamBufferEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('videoLiveStreamBufferDetailScrollView');
    await scrollTo('uuid', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('29a014d4-15b1-4de9-954f-b7df2b7dc241');
    await scrollTo('bufferData', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('bufferData'))).toBeVisible();
    await scrollTo('bufferNumber', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('bufferNumber'))).toHaveLabel('87322');
    await scrollTo('path', 'videoLiveStreamBufferDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('Secured withdrawal port');

    // delete
    await scrollTo('videoLiveStreamBufferDeleteButton', 'videoLiveStreamBufferDetailScrollView');
    await waitThenTapButton('videoLiveStreamBufferDeleteButton');
    await waitForElementToBeVisibleById('videoLiveStreamBufferDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('videoLiveStreamBufferScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
