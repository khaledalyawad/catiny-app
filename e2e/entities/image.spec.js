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

describe('Image Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToImageScreen();
  });

  const navigateToImageScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('imageEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('imageEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('imageScreen');
  };

  it('should allow you to create, update, and delete the Image entity', async () => {
    await expect(element(by.id('imageScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('imageEditScrollView');
    await scrollTo('uuidInput', 'imageEditScrollView');
    await element(by.id('uuidInput')).replaceText('0a84aaaa-c0ef-4ab1-a72c-46d6195081df');
    await scrollTo('nameInput', 'imageEditScrollView');
    await element(by.id('nameInput')).replaceText('24/7');
    await scrollTo('widthInput', 'imageEditScrollView');
    await element(by.id('widthInput')).replaceText('93203');
    await scrollTo('heightInput', 'imageEditScrollView');
    await element(by.id('heightInput')).replaceText('7977');
    await scrollTo('qualityInput', 'imageEditScrollView');
    await element(by.id('qualityInput')).replaceText('1');
    await scrollTo('pixelSizeInput', 'imageEditScrollView');
    await element(by.id('pixelSizeInput')).replaceText('5147');
    await scrollTo('priorityIndexInput', 'imageEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('60980');
    await scrollTo('dataSizeInput', 'imageEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('97477');
    await element(by.id('imageEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'imageEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('imageDetailScrollView');
    await scrollTo('uuid', 'imageDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('0a84aaaa-c0ef-4ab1-a72c-46d6195081df');
    await scrollTo('name', 'imageDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('24/7');
    await scrollTo('width', 'imageDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('93203');
    await scrollTo('height', 'imageDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('7977');
    await scrollTo('quality', 'imageDetailScrollView');
    await expect(element(by.id('quality'))).toHaveLabel('1');
    await scrollTo('pixelSize', 'imageDetailScrollView');
    await expect(element(by.id('pixelSize'))).toHaveLabel('5147');
    await scrollTo('priorityIndex', 'imageDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('60980');
    await scrollTo('dataSize', 'imageDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('97477');

    // update
    await scrollTo('imageEditButton', 'imageDetailScrollView');
    await tapFirstElementByLabel('Image Edit Button');
    await waitForElementToBeVisibleById('imageEditScrollView');
    await scrollTo('uuidInput', 'imageEditScrollView');
    await element(by.id('uuidInput')).replaceText('0a84aaaa-c0ef-4ab1-a72c-46d6195081df');
    await scrollTo('nameInput', 'imageEditScrollView');
    await element(by.id('nameInput')).replaceText('24/7');
    await scrollTo('widthInput', 'imageEditScrollView');
    await element(by.id('widthInput')).replaceText('53819');
    await scrollTo('heightInput', 'imageEditScrollView');
    await element(by.id('heightInput')).replaceText('19181');
    await scrollTo('qualityInput', 'imageEditScrollView');
    await element(by.id('qualityInput')).replaceText('1');
    await scrollTo('pixelSizeInput', 'imageEditScrollView');
    await element(by.id('pixelSizeInput')).replaceText('36954');
    await scrollTo('priorityIndexInput', 'imageEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('60106');
    await scrollTo('dataSizeInput', 'imageEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('78657');
    await element(by.id('imageEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'imageEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('imageDetailScrollView');
    await scrollTo('uuid', 'imageDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('0a84aaaa-c0ef-4ab1-a72c-46d6195081df');
    await scrollTo('name', 'imageDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('24/7');
    await scrollTo('width', 'imageDetailScrollView');
    await expect(element(by.id('width'))).toHaveLabel('53819');
    await scrollTo('height', 'imageDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('19181');
    await scrollTo('quality', 'imageDetailScrollView');
    await expect(element(by.id('quality'))).toHaveLabel('1');
    await scrollTo('pixelSize', 'imageDetailScrollView');
    await expect(element(by.id('pixelSize'))).toHaveLabel('36954');
    await scrollTo('priorityIndex', 'imageDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('60106');
    await scrollTo('dataSize', 'imageDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('78657');

    // delete
    await scrollTo('imageDeleteButton', 'imageDetailScrollView');
    await waitThenTapButton('imageDeleteButton');
    await waitForElementToBeVisibleById('imageDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('imageScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
