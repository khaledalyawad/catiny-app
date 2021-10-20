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

describe('TopicInterest Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTopicInterestScreen();
  });

  const navigateToTopicInterestScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('topicInterestEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('topicInterestEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('topicInterestScreen');
  };

  it('should allow you to create, update, and delete the TopicInterest entity', async () => {
    await expect(element(by.id('topicInterestScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('topicInterestEditScrollView');
    await scrollTo('uuidInput', 'topicInterestEditScrollView');
    await element(by.id('uuidInput')).replaceText('07a5b6e4-a643-45a7-b28f-316a296235c2');
    await scrollTo('titleInput', 'topicInterestEditScrollView');
    await element(by.id('titleInput')).replaceText('bandwidth adapter protocol');
    await scrollTo('contentInput', 'topicInterestEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await element(by.id('topicInterestEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'topicInterestEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('topicInterestDetailScrollView');
    await scrollTo('uuid', 'topicInterestDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('07a5b6e4-a643-45a7-b28f-316a296235c2');
    await scrollTo('title', 'topicInterestDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('bandwidth adapter protocol');
    await scrollTo('content', 'topicInterestDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('topicInterestEditButton', 'topicInterestDetailScrollView');
    await tapFirstElementByLabel('TopicInterest Edit Button');
    await waitForElementToBeVisibleById('topicInterestEditScrollView');
    await scrollTo('uuidInput', 'topicInterestEditScrollView');
    await element(by.id('uuidInput')).replaceText('07a5b6e4-a643-45a7-b28f-316a296235c2');
    await scrollTo('titleInput', 'topicInterestEditScrollView');
    await element(by.id('titleInput')).replaceText('bandwidth adapter protocol');
    await scrollTo('contentInput', 'topicInterestEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await element(by.id('topicInterestEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'topicInterestEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('topicInterestDetailScrollView');
    await scrollTo('uuid', 'topicInterestDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('07a5b6e4-a643-45a7-b28f-316a296235c2');
    await scrollTo('title', 'topicInterestDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('bandwidth adapter protocol');
    await scrollTo('content', 'topicInterestDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('topicInterestDeleteButton', 'topicInterestDetailScrollView');
    await waitThenTapButton('topicInterestDeleteButton');
    await waitForElementToBeVisibleById('topicInterestDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('topicInterestScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
