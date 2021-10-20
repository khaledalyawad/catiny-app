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

describe('Video Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToVideoScreen();
  });

  const navigateToVideoScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('videoEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('videoEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('videoScreen');
  };

  it('should allow you to create, update, and delete the Video entity', async () => {
    await expect(element(by.id('videoScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('videoEditScrollView');
    await scrollTo('uuidInput', 'videoEditScrollView');
    await element(by.id('uuidInput')).replaceText('57d9baad-e128-49b7-8fa7-4d217d78f832');
    await scrollTo('nameInput', 'videoEditScrollView');
    await element(by.id('nameInput')).replaceText('Parkways withdrawal');
    await scrollTo('widthInput', 'videoEditScrollView');
    await element(by.id('widthInput')).replaceText('23066');
    await scrollTo('heightInput', 'videoEditScrollView');
    await element(by.id('heightInput')).replaceText('33054');
    await scrollTo('qualityImageInput', 'videoEditScrollView');
    await element(by.id('qualityImageInput')).replaceText('0');
    await scrollTo('qualityAudioInput', 'videoEditScrollView');
    await element(by.id('qualityAudioInput')).replaceText('1');
    await scrollTo('qualityInput', 'videoEditScrollView');
    await element(by.id('qualityInput')).replaceText('1');
    await scrollTo('pixelSizeInput', 'videoEditScrollView');
    await element(by.id('pixelSizeInput')).replaceText('49763');
    await scrollTo('priorityIndexInput', 'videoEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('44648');
    await scrollTo('dataSizeInput', 'videoEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('8808');
    await element(by.id('videoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('videoDetailScrollView');
    await scrollTo('uuid', 'videoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('57d9baad-e128-49b7-8fa7-4d217d78f832');
    await scrollTo('name', 'videoDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Parkways withdrawal');
    await scrollTo('width', 'videoDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('23066');
    await scrollTo('height', 'videoDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('33054');
    await scrollTo('qualityImage', 'videoDetailScrollView');
    await expect(element(by.id('qualityImage'))).toHaveLabel('0');
    await scrollTo('qualityAudio', 'videoDetailScrollView');
    await expect(element(by.id('qualityAudio'))).toHaveLabel('1');
    await scrollTo('quality', 'videoDetailScrollView');
    await expect(element(by.id('quality'))).toHaveLabel('1');
    await scrollTo('pixelSize', 'videoDetailScrollView');
    await expect(element(by.id('pixelSize'))).toHaveLabel('49763');
    await scrollTo('priorityIndex', 'videoDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('44648');
    await scrollTo('dataSize', 'videoDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('8808');

    // update
    await scrollTo('videoEditButton', 'videoDetailScrollView');
    await tapFirstElementByLabel('Video Edit Button');
    await waitForElementToBeVisibleById('videoEditScrollView');
    await scrollTo('uuidInput', 'videoEditScrollView');
    await element(by.id('uuidInput')).replaceText('57d9baad-e128-49b7-8fa7-4d217d78f832');
    await scrollTo('nameInput', 'videoEditScrollView');
    await element(by.id('nameInput')).replaceText('Parkways withdrawal');
    await scrollTo('widthInput', 'videoEditScrollView');
    await element(by.id('widthInput')).replaceText('38416');
    await scrollTo('heightInput', 'videoEditScrollView');
    await element(by.id('heightInput')).replaceText('81232');
    await scrollTo('qualityImageInput', 'videoEditScrollView');
    await element(by.id('qualityImageInput')).replaceText('0');
    await scrollTo('qualityAudioInput', 'videoEditScrollView');
    await element(by.id('qualityAudioInput')).replaceText('1');
    await scrollTo('qualityInput', 'videoEditScrollView');
    await element(by.id('qualityInput')).replaceText('1');
    await scrollTo('pixelSizeInput', 'videoEditScrollView');
    await element(by.id('pixelSizeInput')).replaceText('20932');
    await scrollTo('priorityIndexInput', 'videoEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('51322');
    await scrollTo('dataSizeInput', 'videoEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('42377');
    await element(by.id('videoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'videoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('videoDetailScrollView');
    await scrollTo('uuid', 'videoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('57d9baad-e128-49b7-8fa7-4d217d78f832');
    await scrollTo('name', 'videoDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Parkways withdrawal');
    await scrollTo('width', 'videoDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('38416');
    await scrollTo('height', 'videoDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('81232');
    await scrollTo('qualityImage', 'videoDetailScrollView');
    await expect(element(by.id('qualityImage'))).toHaveLabel('0');
    await scrollTo('qualityAudio', 'videoDetailScrollView');
    await expect(element(by.id('qualityAudio'))).toHaveLabel('1');
    await scrollTo('quality', 'videoDetailScrollView');
    await expect(element(by.id('quality'))).toHaveLabel('1');
    await scrollTo('pixelSize', 'videoDetailScrollView');
    await expect(element(by.id('pixelSize'))).toHaveLabel('20932');
    await scrollTo('priorityIndex', 'videoDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('51322');
    await scrollTo('dataSize', 'videoDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('42377');

    // delete
    await scrollTo('videoDeleteButton', 'videoDetailScrollView');
    await waitThenTapButton('videoDeleteButton');
    await waitForElementToBeVisibleById('videoDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('videoScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
