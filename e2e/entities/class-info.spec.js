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

describe('ClassInfo Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToClassInfoScreen();
  });

  const navigateToClassInfoScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('classInfoEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('classInfoEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('classInfoScreen');
  };

  it('should allow you to create, update, and delete the ClassInfo entity', async () => {
    await expect(element(by.id('classInfoScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('classInfoEditScrollView');
    await scrollTo('uuidInput', 'classInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('4050348c-03ee-4cd7-9c08-ad54892525cf');
    await scrollTo('namePackageInput', 'classInfoEditScrollView');
    await element(by.id('namePackageInput')).replaceText('Investor');
    await scrollTo('fullNameInput', 'classInfoEditScrollView');
    await element(by.id('fullNameInput')).replaceText('Reduced invoice');
    await scrollTo('classNameInput', 'classInfoEditScrollView');
    await element(by.id('classNameInput')).replaceText('Account');
    await element(by.id('classInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'classInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('classInfoDetailScrollView');
    await scrollTo('uuid', 'classInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4050348c-03ee-4cd7-9c08-ad54892525cf');
    await scrollTo('namePackage', 'classInfoDetailScrollView');
    await expect(element(by.id('namePackage'))).toHaveLabel('Investor');
    await scrollTo('fullName', 'classInfoDetailScrollView');
    await expect(element(by.id('fullName'))).toHaveLabel('Reduced invoice');
    await scrollTo('className', 'classInfoDetailScrollView');
    await expect(element(by.id('className'))).toHaveLabel('Account');

    // update
    await scrollTo('classInfoEditButton', 'classInfoDetailScrollView');
    await tapFirstElementByLabel('ClassInfo Edit Button');
    await waitForElementToBeVisibleById('classInfoEditScrollView');
    await scrollTo('uuidInput', 'classInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('4050348c-03ee-4cd7-9c08-ad54892525cf');
    await scrollTo('namePackageInput', 'classInfoEditScrollView');
    await element(by.id('namePackageInput')).replaceText('Investor');
    await scrollTo('fullNameInput', 'classInfoEditScrollView');
    await element(by.id('fullNameInput')).replaceText('Reduced invoice');
    await scrollTo('classNameInput', 'classInfoEditScrollView');
    await element(by.id('classNameInput')).replaceText('Account');
    await element(by.id('classInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'classInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('classInfoDetailScrollView');
    await scrollTo('uuid', 'classInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('4050348c-03ee-4cd7-9c08-ad54892525cf');
    await scrollTo('namePackage', 'classInfoDetailScrollView');
    await expect(element(by.id('namePackage'))).toHaveLabel('Investor');
    await scrollTo('fullName', 'classInfoDetailScrollView');
    await expect(element(by.id('fullName'))).toHaveLabel('Reduced invoice');
    await scrollTo('className', 'classInfoDetailScrollView');
    await expect(element(by.id('className'))).toHaveLabel('Account');

    // delete
    await scrollTo('classInfoDeleteButton', 'classInfoDetailScrollView');
    await waitThenTapButton('classInfoDeleteButton');
    await waitForElementToBeVisibleById('classInfoDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('classInfoScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
