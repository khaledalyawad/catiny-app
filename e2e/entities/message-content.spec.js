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

describe('MessageContent Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToMessageContentScreen();
  });

  const navigateToMessageContentScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('messageContentEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('messageContentEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('messageContentScreen');
  };

  it('should allow you to create, update, and delete the MessageContent entity', async () => {
    await expect(element(by.id('messageContentScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('messageContentEditScrollView');
    await scrollTo('uuidInput', 'messageContentEditScrollView');
    await element(by.id('uuidInput')).replaceText('886b9029-c7e3-467a-9331-1e822f5ba887');
    await scrollTo('senderNameInput', 'messageContentEditScrollView');
    await element(by.id('senderNameInput')).replaceText('Omani');
    await scrollTo('attachInput', 'messageContentEditScrollView');
    await element(by.id('attachInput')).replaceText('long-text-blob-content');
    await scrollTo('contentInput', 'messageContentEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await scrollTo('statusInput', 'messageContentEditScrollView');
    await element(by.id('statusInput')).replaceText('long-text-blob-content');
    await scrollTo('searchFieldInput', 'messageContentEditScrollView');
    await element(by.id('searchFieldInput')).replaceText('long-text-blob-content');
    await element(by.id('messageContentEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'messageContentEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('messageContentDetailScrollView');
    await scrollTo('uuid', 'messageContentDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('886b9029-c7e3-467a-9331-1e822f5ba887');
    await scrollTo('senderName', 'messageContentDetailScrollView');
    await expect(element(by.id('senderName'))).toHaveLabel('Omani');
    await scrollTo('attach', 'messageContentDetailScrollView');
    await expect(element(by.id('attach'))).toHaveLabel('long-text-blob-content');
    await scrollTo('content', 'messageContentDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');
    await scrollTo('status', 'messageContentDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('long-text-blob-content');
    await scrollTo('searchField', 'messageContentDetailScrollView');
    await expect(element(by.id('searchField'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('messageContentEditButton', 'messageContentDetailScrollView');
    await tapFirstElementByLabel('MessageContent Edit Button');
    await waitForElementToBeVisibleById('messageContentEditScrollView');
    await scrollTo('uuidInput', 'messageContentEditScrollView');
    await element(by.id('uuidInput')).replaceText('886b9029-c7e3-467a-9331-1e822f5ba887');
    await scrollTo('senderNameInput', 'messageContentEditScrollView');
    await element(by.id('senderNameInput')).replaceText('Omani');
    await scrollTo('attachInput', 'messageContentEditScrollView');
    await element(by.id('attachInput')).replaceText('long-text-blob-content-2');
    await scrollTo('contentInput', 'messageContentEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await scrollTo('statusInput', 'messageContentEditScrollView');
    await element(by.id('statusInput')).replaceText('long-text-blob-content-2');
    await scrollTo('searchFieldInput', 'messageContentEditScrollView');
    await element(by.id('searchFieldInput')).replaceText('long-text-blob-content-2');
    await element(by.id('messageContentEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'messageContentEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('messageContentDetailScrollView');
    await scrollTo('uuid', 'messageContentDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('886b9029-c7e3-467a-9331-1e822f5ba887');
    await scrollTo('senderName', 'messageContentDetailScrollView');
    await expect(element(by.id('senderName'))).toHaveLabel('Omani');
    await scrollTo('attach', 'messageContentDetailScrollView');
    await expect(element(by.id('attach'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('content', 'messageContentDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('status', 'messageContentDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('searchField', 'messageContentDetailScrollView');
    await expect(element(by.id('searchField'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('messageContentDeleteButton', 'messageContentDetailScrollView');
    await waitThenTapButton('messageContentDeleteButton');
    await waitForElementToBeVisibleById('messageContentDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('messageContentScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
