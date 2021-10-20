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

describe('FileInfo Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFileInfoScreen();
  });

  const navigateToFileInfoScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('fileInfoEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('fileInfoEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('fileInfoScreen');
  };

  it('should allow you to create, update, and delete the FileInfo entity', async () => {
    await expect(element(by.id('fileInfoScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('fileInfoEditScrollView');
    await scrollTo('uuidInput', 'fileInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('a7af6495-d691-411f-8241-aca5acfeb225');
    await scrollTo('nameFileInput', 'fileInfoEditScrollView');
    await element(by.id('nameFileInput')).replaceText('Rupiah');
    await scrollTo('typeFileInput', 'fileInfoEditScrollView');
    await element(by.id('typeFileInput')).replaceText('withdrawal Health Borders');
    await scrollTo('pathInput', 'fileInfoEditScrollView');
    await element(by.id('pathInput')).replaceText('Designer Quality Tasty');
    await scrollTo('dataSizeInput', 'fileInfoEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('72757');
    await element(by.id('fileInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'fileInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('fileInfoDetailScrollView');
    await scrollTo('uuid', 'fileInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('a7af6495-d691-411f-8241-aca5acfeb225');
    await scrollTo('nameFile', 'fileInfoDetailScrollView');
    await expect(element(by.id('nameFile'))).toHaveLabel('Rupiah');
    await scrollTo('typeFile', 'fileInfoDetailScrollView');
    await expect(element(by.id('typeFile'))).toHaveLabel('withdrawal Health Borders');
    await scrollTo('path', 'fileInfoDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('Designer Quality Tasty');
    await scrollTo('dataSize', 'fileInfoDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('72757');

    // update
    await scrollTo('fileInfoEditButton', 'fileInfoDetailScrollView');
    await tapFirstElementByLabel('FileInfo Edit Button');
    await waitForElementToBeVisibleById('fileInfoEditScrollView');
    await scrollTo('uuidInput', 'fileInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('a7af6495-d691-411f-8241-aca5acfeb225');
    await scrollTo('nameFileInput', 'fileInfoEditScrollView');
    await element(by.id('nameFileInput')).replaceText('Rupiah');
    await scrollTo('typeFileInput', 'fileInfoEditScrollView');
    await element(by.id('typeFileInput')).replaceText('withdrawal Health Borders');
    await scrollTo('pathInput', 'fileInfoEditScrollView');
    await element(by.id('pathInput')).replaceText('Designer Quality Tasty');
    await scrollTo('dataSizeInput', 'fileInfoEditScrollView');
    await element(by.id('dataSizeInput')).replaceText('34015');
    await element(by.id('fileInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'fileInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('fileInfoDetailScrollView');
    await scrollTo('uuid', 'fileInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('a7af6495-d691-411f-8241-aca5acfeb225');
    await scrollTo('nameFile', 'fileInfoDetailScrollView');
    await expect(element(by.id('nameFile'))).toHaveLabel('Rupiah');
    await scrollTo('typeFile', 'fileInfoDetailScrollView');
    await expect(element(by.id('typeFile'))).toHaveLabel('withdrawal Health Borders');
    await scrollTo('path', 'fileInfoDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('Designer Quality Tasty');
    await scrollTo('dataSize', 'fileInfoDetailScrollView');
    await expect(element(by.id('dataSize'))).toHaveLabel('34015');

    // delete
    await scrollTo('fileInfoDeleteButton', 'fileInfoDetailScrollView');
    await waitThenTapButton('fileInfoDeleteButton');
    await waitForElementToBeVisibleById('fileInfoDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('fileInfoScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
