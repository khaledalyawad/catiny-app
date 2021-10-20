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

describe('Permission Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToPermissionScreen();
  });

  const navigateToPermissionScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('permissionEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('permissionEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('permissionScreen');
  };

  it('should allow you to create, update, and delete the Permission entity', async () => {
    await expect(element(by.id('permissionScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('permissionEditScrollView');
    await scrollTo('uuidInput', 'permissionEditScrollView');
    await element(by.id('uuidInput')).replaceText('89d13e05-c0dd-4e20-a125-a94f51fb696b');
    await scrollTo('readInput', 'permissionEditScrollView');
    await toggleSwitchToValue('readInput', true);
    await scrollTo('writeInput', 'permissionEditScrollView');
    await toggleSwitchToValue('writeInput', true);
    await scrollTo('shareInput', 'permissionEditScrollView');
    await toggleSwitchToValue('shareInput', true);
    await scrollTo('deleteInput', 'permissionEditScrollView');
    await toggleSwitchToValue('deleteInput', false);
    await scrollTo('addInput', 'permissionEditScrollView');
    await toggleSwitchToValue('addInput', true);
    await scrollTo('levelInput', 'permissionEditScrollView');
    await element(by.id('levelInput')).replaceText('57854');
    await element(by.id('permissionEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'permissionEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('permissionDetailScrollView');
    await scrollTo('uuid', 'permissionDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('89d13e05-c0dd-4e20-a125-a94f51fb696b');
    await scrollTo('read', 'permissionDetailScrollView');
    await expect(element(by.id('read'))).toHaveLabel('true');
    await scrollTo('write', 'permissionDetailScrollView');
    await expect(element(by.id('write'))).toHaveLabel('true');
    await scrollTo('share', 'permissionDetailScrollView');
    await expect(element(by.id('share'))).toHaveLabel('true');
    await scrollTo('delete', 'permissionDetailScrollView');
    await expect(element(by.id('delete'))).toHaveLabel('false');
    await scrollTo('add', 'permissionDetailScrollView');
    await expect(element(by.id('add'))).toHaveLabel('true');
    await scrollTo('level', 'permissionDetailScrollView');
    await expect(element(by.id('level'))).toHaveLabel('57854');

    // update
    await scrollTo('permissionEditButton', 'permissionDetailScrollView');
    await tapFirstElementByLabel('Permission Edit Button');
    await waitForElementToBeVisibleById('permissionEditScrollView');
    await scrollTo('uuidInput', 'permissionEditScrollView');
    await element(by.id('uuidInput')).replaceText('89d13e05-c0dd-4e20-a125-a94f51fb696b');
    await scrollTo('readInput', 'permissionEditScrollView');
    await toggleSwitchToValue('readInput', false);
    await scrollTo('writeInput', 'permissionEditScrollView');
    await toggleSwitchToValue('writeInput', true);
    await scrollTo('shareInput', 'permissionEditScrollView');
    await toggleSwitchToValue('shareInput', true);
    await scrollTo('deleteInput', 'permissionEditScrollView');
    await toggleSwitchToValue('deleteInput', false);
    await scrollTo('addInput', 'permissionEditScrollView');
    await toggleSwitchToValue('addInput', true);
    await scrollTo('levelInput', 'permissionEditScrollView');
    await element(by.id('levelInput')).replaceText('66876');
    await element(by.id('permissionEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'permissionEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('permissionDetailScrollView');
    await scrollTo('uuid', 'permissionDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('89d13e05-c0dd-4e20-a125-a94f51fb696b');
    await scrollTo('read', 'permissionDetailScrollView');
    await expect(element(by.id('read'))).toHaveLabel('false');
    await scrollTo('write', 'permissionDetailScrollView');
    await expect(element(by.id('write'))).toHaveLabel('true');
    await scrollTo('share', 'permissionDetailScrollView');
    await expect(element(by.id('share'))).toHaveLabel('true');
    await scrollTo('delete', 'permissionDetailScrollView');
    await expect(element(by.id('delete'))).toHaveLabel('false');
    await scrollTo('add', 'permissionDetailScrollView');
    await expect(element(by.id('add'))).toHaveLabel('true');
    await scrollTo('level', 'permissionDetailScrollView');
    await expect(element(by.id('level'))).toHaveLabel('66876');

    // delete
    await scrollTo('permissionDeleteButton', 'permissionDetailScrollView');
    await waitThenTapButton('permissionDeleteButton');
    await waitForElementToBeVisibleById('permissionDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('permissionScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
