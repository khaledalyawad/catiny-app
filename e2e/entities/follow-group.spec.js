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

describe('FollowGroup Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFollowGroupScreen();
  });

  const navigateToFollowGroupScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('followGroupEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('followGroupEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('followGroupScreen');
  };

  it('should allow you to create, update, and delete the FollowGroup entity', async () => {
    await expect(element(by.id('followGroupScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('followGroupEditScrollView');
    await scrollTo('uuidInput', 'followGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('dd74bb1a-6c06-49ff-89e0-3f0093164ab2');
    await element(by.id('followGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('followGroupDetailScrollView');
    await scrollTo('uuid', 'followGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('dd74bb1a-6c06-49ff-89e0-3f0093164ab2');

    // update
    await scrollTo('followGroupEditButton', 'followGroupDetailScrollView');
    await tapFirstElementByLabel('FollowGroup Edit Button');
    await waitForElementToBeVisibleById('followGroupEditScrollView');
    await scrollTo('uuidInput', 'followGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('dd74bb1a-6c06-49ff-89e0-3f0093164ab2');
    await element(by.id('followGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'followGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('followGroupDetailScrollView');
    await scrollTo('uuid', 'followGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('dd74bb1a-6c06-49ff-89e0-3f0093164ab2');

    // delete
    await scrollTo('followGroupDeleteButton', 'followGroupDetailScrollView');
    await waitThenTapButton('followGroupDeleteButton');
    await waitForElementToBeVisibleById('followGroupDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('followGroupScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
