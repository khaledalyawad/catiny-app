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

describe('HanhChinhVN Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToHanhChinhVNScreen();
  });

  const navigateToHanhChinhVNScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('hanhChinhVNEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('hanhChinhVNEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('hanhChinhVNScreen');
  };

  it('should allow you to create, update, and delete the HanhChinhVN entity', async () => {
    await expect(element(by.id('hanhChinhVNScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('hanhChinhVNEditScrollView');
    await scrollTo('nameInput', 'hanhChinhVNEditScrollView');
    await element(by.id('nameInput')).replaceText('Dynamic TCP');
    await scrollTo('slugInput', 'hanhChinhVNEditScrollView');
    await element(by.id('slugInput')).replaceText('Pataca');
    await scrollTo('typeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('typeInput')).replaceText('Data East Hat');
    await scrollTo('nameWithTypeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('nameWithTypeInput')).replaceText('Peso');
    await scrollTo('codeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('codeInput')).replaceText('Bedfordshire District');
    await scrollTo('parentCodeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('parentCodeInput')).replaceText('Tasty parse');
    await scrollTo('pathInput', 'hanhChinhVNEditScrollView');
    await element(by.id('pathInput')).replaceText('pricing');
    await scrollTo('pathWithTypeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('pathWithTypeInput')).replaceText('panel Leu');
    await element(by.id('hanhChinhVNEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'hanhChinhVNEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('hanhChinhVNDetailScrollView');
    await scrollTo('name', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Dynamic TCP');
    await scrollTo('slug', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('slug'))).toHaveLabel('Pataca');
    await scrollTo('type', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('Data East Hat');
    await scrollTo('nameWithType', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('nameWithType'))).toHaveLabel('Peso');
    await scrollTo('code', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('code'))).toHaveLabel('Bedfordshire District');
    await scrollTo('parentCode', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('parentCode'))).toHaveLabel('Tasty parse');
    await scrollTo('path', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('pricing');
    await scrollTo('pathWithType', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('pathWithType'))).toHaveLabel('panel Leu');

    // update
    await scrollTo('hanhChinhVNEditButton', 'hanhChinhVNDetailScrollView');
    await tapFirstElementByLabel('HanhChinhVN Edit Button');
    await waitForElementToBeVisibleById('hanhChinhVNEditScrollView');
    await scrollTo('nameInput', 'hanhChinhVNEditScrollView');
    await element(by.id('nameInput')).replaceText('Dynamic TCP');
    await scrollTo('slugInput', 'hanhChinhVNEditScrollView');
    await element(by.id('slugInput')).replaceText('Pataca');
    await scrollTo('typeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('typeInput')).replaceText('Data East Hat');
    await scrollTo('nameWithTypeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('nameWithTypeInput')).replaceText('Peso');
    await scrollTo('codeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('codeInput')).replaceText('Bedfordshire District');
    await scrollTo('parentCodeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('parentCodeInput')).replaceText('Tasty parse');
    await scrollTo('pathInput', 'hanhChinhVNEditScrollView');
    await element(by.id('pathInput')).replaceText('pricing');
    await scrollTo('pathWithTypeInput', 'hanhChinhVNEditScrollView');
    await element(by.id('pathWithTypeInput')).replaceText('panel Leu');
    await element(by.id('hanhChinhVNEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'hanhChinhVNEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('hanhChinhVNDetailScrollView');
    await scrollTo('name', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Dynamic TCP');
    await scrollTo('slug', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('slug'))).toHaveLabel('Pataca');
    await scrollTo('type', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('Data East Hat');
    await scrollTo('nameWithType', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('nameWithType'))).toHaveLabel('Peso');
    await scrollTo('code', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('code'))).toHaveLabel('Bedfordshire District');
    await scrollTo('parentCode', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('parentCode'))).toHaveLabel('Tasty parse');
    await scrollTo('path', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('path'))).toHaveLabel('pricing');
    await scrollTo('pathWithType', 'hanhChinhVNDetailScrollView');
    await expect(element(by.id('pathWithType'))).toHaveLabel('panel Leu');

    // delete
    await scrollTo('hanhChinhVNDeleteButton', 'hanhChinhVNDetailScrollView');
    await waitThenTapButton('hanhChinhVNDeleteButton');
    await waitForElementToBeVisibleById('hanhChinhVNDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('hanhChinhVNScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
