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

describe('RankGroup Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToRankGroupScreen();
  });

  const navigateToRankGroupScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('rankGroupEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('rankGroupEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('rankGroupScreen');
  };

  it('should allow you to create, update, and delete the RankGroup entity', async () => {
    await expect(element(by.id('rankGroupScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('rankGroupEditScrollView');
    await scrollTo('uuidInput', 'rankGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('a37a4702-d455-4c31-956d-14f578559eab');
    await element(by.id('rankGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'rankGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('rankGroupDetailScrollView');
    await scrollTo('uuid', 'rankGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('a37a4702-d455-4c31-956d-14f578559eab');

    // update
    await scrollTo('rankGroupEditButton', 'rankGroupDetailScrollView');
    await tapFirstElementByLabel('RankGroup Edit Button');
    await waitForElementToBeVisibleById('rankGroupEditScrollView');
    await scrollTo('uuidInput', 'rankGroupEditScrollView');
    await element(by.id('uuidInput')).replaceText('a37a4702-d455-4c31-956d-14f578559eab');
    await element(by.id('rankGroupEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'rankGroupEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('rankGroupDetailScrollView');
    await scrollTo('uuid', 'rankGroupDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('a37a4702-d455-4c31-956d-14f578559eab');

    // delete
    await scrollTo('rankGroupDeleteButton', 'rankGroupDetailScrollView');
    await waitThenTapButton('rankGroupDeleteButton');
    await waitForElementToBeVisibleById('rankGroupDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('rankGroupScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
