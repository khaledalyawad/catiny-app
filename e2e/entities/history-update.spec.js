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

describe('HistoryUpdate Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToHistoryUpdateScreen();
  });

  const navigateToHistoryUpdateScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('historyUpdateEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('historyUpdateEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('historyUpdateScreen');
  };

  it('should allow you to create, update, and delete the HistoryUpdate entity', async () => {
    await expect(element(by.id('historyUpdateScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('historyUpdateEditScrollView');
    await scrollTo('uuidInput', 'historyUpdateEditScrollView');
    await element(by.id('uuidInput')).replaceText('660734a9-be18-41ca-bf0f-c281b262e48c');
    await scrollTo('versionInput', 'historyUpdateEditScrollView');
    await element(by.id('versionInput')).replaceText('24689');
    await scrollTo('contentInput', 'historyUpdateEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await element(by.id('historyUpdateEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'historyUpdateEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('historyUpdateDetailScrollView');
    await scrollTo('uuid', 'historyUpdateDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('660734a9-be18-41ca-bf0f-c281b262e48c');
    await scrollTo('version', 'historyUpdateDetailScrollView');
    await expect(element(by.id('version'))).toHaveLabel('24689');
    await scrollTo('content', 'historyUpdateDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('historyUpdateEditButton', 'historyUpdateDetailScrollView');
    await tapFirstElementByLabel('HistoryUpdate Edit Button');
    await waitForElementToBeVisibleById('historyUpdateEditScrollView');
    await scrollTo('uuidInput', 'historyUpdateEditScrollView');
    await element(by.id('uuidInput')).replaceText('660734a9-be18-41ca-bf0f-c281b262e48c');
    await scrollTo('versionInput', 'historyUpdateEditScrollView');
    await element(by.id('versionInput')).replaceText('95597');
    await scrollTo('contentInput', 'historyUpdateEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await element(by.id('historyUpdateEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'historyUpdateEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('historyUpdateDetailScrollView');
    await scrollTo('uuid', 'historyUpdateDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('660734a9-be18-41ca-bf0f-c281b262e48c');
    await scrollTo('version', 'historyUpdateDetailScrollView');
    await expect(element(by.id('version'))).toHaveLabel('95597');
    await scrollTo('content', 'historyUpdateDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('historyUpdateDeleteButton', 'historyUpdateDetailScrollView');
    await waitThenTapButton('historyUpdateDeleteButton');
    await waitForElementToBeVisibleById('historyUpdateDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('historyUpdateScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
