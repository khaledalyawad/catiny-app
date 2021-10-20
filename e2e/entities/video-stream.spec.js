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

describe('VideoStream Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToVideoStreamScreen();
  });

  const navigateToVideoStreamScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('videoStreamEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('videoStreamEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('videoStreamScreen');
  };

  it('should allow you to create, update, and delete the VideoStream entity', async () => {
    await expect(element(by.id('videoStreamScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('videoStreamEditScrollView');
    await scrollTo('uuidInput', 'videoStreamEditScrollView');
    await element(by.id('uuidInput')).replaceText('4a8c27d4-6780-4d3f-a75a-98481f7049d9');
    await scrollTo('isLivestreamingInput', 'videoStreamEditScrollView');
    await toggleSwitchToValue('isLivestreamingInput', true);
    await element(by.id('videoStreamEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoStreamEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('videoStreamDetailScrollView');
    await scrollTo('uuid', 'videoStreamDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4a8c27d4-6780-4d3f-a75a-98481f7049d9');
    await scrollTo('isLivestreaming', 'videoStreamDetailScrollView');
    await expect(element(by.id('isLivestreaming'))).toHaveLabel('true');

    // update
    await scrollTo('videoStreamEditButton', 'videoStreamDetailScrollView');
    await tapFirstElementByLabel('VideoStream Edit Button');
    await waitForElementToBeVisibleById('videoStreamEditScrollView');
    await scrollTo('uuidInput', 'videoStreamEditScrollView');
    await element(by.id('uuidInput')).replaceText('4a8c27d4-6780-4d3f-a75a-98481f7049d9');
    await scrollTo('isLivestreamingInput', 'videoStreamEditScrollView');
    await toggleSwitchToValue('isLivestreamingInput', false);
    await element(by.id('videoStreamEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoStreamEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('videoStreamDetailScrollView');
    await scrollTo('uuid', 'videoStreamDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4a8c27d4-6780-4d3f-a75a-98481f7049d9');
    await scrollTo('isLivestreaming', 'videoStreamDetailScrollView');
    await expect(element(by.id('isLivestreaming'))).toHaveLabel('false');

    // delete
    await scrollTo('videoStreamDeleteButton', 'videoStreamDetailScrollView');
    await waitThenTapButton('videoStreamDeleteButton');
    await waitForElementToBeVisibleById('videoStreamDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('videoStreamScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
