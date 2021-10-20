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

describe('Notification Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToNotificationScreen();
  });

  const navigateToNotificationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('notificationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('notificationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('notificationScreen');
  };

  it('should allow you to create, update, and delete the Notification entity', async () => {
    await expect(element(by.id('notificationScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    await scrollTo('uuidInput', 'notificationEditScrollView');
    await element(by.id('uuidInput')).replaceText('c264f091-e5e4-4762-b152-5eae658a6177');
    await scrollTo('notifyTypeInput', 'notificationEditScrollView');
    await setPickerValue('notifyTypeInput', 'SYSTEM');
    await scrollTo('titleInput', 'notificationEditScrollView');
    await element(by.id('titleInput')).replaceText('partnerships');
    await scrollTo('contentInput', 'notificationEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await element(by.id('notificationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    await scrollTo('uuid', 'notificationDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c264f091-e5e4-4762-b152-5eae658a6177');
    await scrollTo('notifyType', 'notificationDetailScrollView');
    await expect(element(by.id('notifyType'))).toHaveLabel('SYSTEM');
    await scrollTo('title', 'notificationDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('partnerships');
    await scrollTo('content', 'notificationDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('notificationEditButton', 'notificationDetailScrollView');
    await tapFirstElementByLabel('Notification Edit Button');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    await scrollTo('uuidInput', 'notificationEditScrollView');
    await element(by.id('uuidInput')).replaceText('c264f091-e5e4-4762-b152-5eae658a6177');
    await scrollTo('notifyTypeInput', 'notificationEditScrollView');
    await setPickerValue('notifyTypeInput', 'SYSTEM');
    await scrollTo('titleInput', 'notificationEditScrollView');
    await element(by.id('titleInput')).replaceText('partnerships');
    await scrollTo('contentInput', 'notificationEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await element(by.id('notificationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    await scrollTo('uuid', 'notificationDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c264f091-e5e4-4762-b152-5eae658a6177');
    await scrollTo('notifyType', 'notificationDetailScrollView');
    await expect(element(by.id('notifyType'))).toHaveLabel('SYSTEM');
    await scrollTo('title', 'notificationDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('partnerships');
    await scrollTo('content', 'notificationDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('notificationDeleteButton', 'notificationDetailScrollView');
    await waitThenTapButton('notificationDeleteButton');
    await waitForElementToBeVisibleById('notificationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('notificationScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
