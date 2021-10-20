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

describe('NewsFeed Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToNewsFeedScreen();
  });

  const navigateToNewsFeedScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('newsFeedEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('newsFeedEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('newsFeedScreen');
  };

  it('should allow you to create, update, and delete the NewsFeed entity', async () => {
    await expect(element(by.id('newsFeedScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('newsFeedEditScrollView');
    await scrollTo('uuidInput', 'newsFeedEditScrollView');
    await element(by.id('uuidInput')).replaceText('27174cd2-fbb5-48b3-988a-370e9de32ca5');
    await scrollTo('priorityIndexInput', 'newsFeedEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('75759');
    await element(by.id('newsFeedEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'newsFeedEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('newsFeedDetailScrollView');
    await scrollTo('uuid', 'newsFeedDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('27174cd2-fbb5-48b3-988a-370e9de32ca5');
    await scrollTo('priorityIndex', 'newsFeedDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('75759');

    // update
    await scrollTo('newsFeedEditButton', 'newsFeedDetailScrollView');
    await tapFirstElementByLabel('NewsFeed Edit Button');
    await waitForElementToBeVisibleById('newsFeedEditScrollView');
    await scrollTo('uuidInput', 'newsFeedEditScrollView');
    await element(by.id('uuidInput')).replaceText('27174cd2-fbb5-48b3-988a-370e9de32ca5');
    await scrollTo('priorityIndexInput', 'newsFeedEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('32327');
    await element(by.id('newsFeedEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'newsFeedEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('newsFeedDetailScrollView');
    await scrollTo('uuid', 'newsFeedDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('27174cd2-fbb5-48b3-988a-370e9de32ca5');
    await scrollTo('priorityIndex', 'newsFeedDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('32327');

    // delete
    await scrollTo('newsFeedDeleteButton', 'newsFeedDetailScrollView');
    await waitThenTapButton('newsFeedDeleteButton');
    await waitForElementToBeVisibleById('newsFeedDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('newsFeedScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
