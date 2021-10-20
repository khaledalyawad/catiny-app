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

describe('RankUser Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToRankUserScreen();
  });

  const navigateToRankUserScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('rankUserEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('rankUserEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('rankUserScreen');
  };

  it('should allow you to create, update, and delete the RankUser entity', async () => {
    await expect(element(by.id('rankUserScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('rankUserEditScrollView');
    await scrollTo('uuidInput', 'rankUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('8860f37b-3627-4167-bd0f-d27e113ff6b1');
    await scrollTo('ratingPointsInput', 'rankUserEditScrollView');
    await element(by.id('ratingPointsInput')).replaceText('32734');
    await element(by.id('rankUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'rankUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('rankUserDetailScrollView');
    await scrollTo('uuid', 'rankUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('8860f37b-3627-4167-bd0f-d27e113ff6b1');
    await scrollTo('ratingPoints', 'rankUserDetailScrollView');
    await expect(element(by.id('ratingPoints'))).toHaveLabel('32734');

    // update
    await scrollTo('rankUserEditButton', 'rankUserDetailScrollView');
    await tapFirstElementByLabel('RankUser Edit Button');
    await waitForElementToBeVisibleById('rankUserEditScrollView');
    await scrollTo('uuidInput', 'rankUserEditScrollView');
    await element(by.id('uuidInput')).replaceText('8860f37b-3627-4167-bd0f-d27e113ff6b1');
    await scrollTo('ratingPointsInput', 'rankUserEditScrollView');
    await element(by.id('ratingPointsInput')).replaceText('65781');
    await element(by.id('rankUserEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'rankUserEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('rankUserDetailScrollView');
    await scrollTo('uuid', 'rankUserDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('8860f37b-3627-4167-bd0f-d27e113ff6b1');
    await scrollTo('ratingPoints', 'rankUserDetailScrollView');
    await expect(element(by.id('ratingPoints'))).toHaveLabel('65781');

    // delete
    await scrollTo('rankUserDeleteButton', 'rankUserDetailScrollView');
    await waitThenTapButton('rankUserDeleteButton');
    await waitForElementToBeVisibleById('rankUserDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('rankUserScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
