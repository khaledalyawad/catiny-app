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

describe('Album Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToAlbumScreen();
  });

  const navigateToAlbumScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('albumEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('albumEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('albumScreen');
  };

  it('should allow you to create, update, and delete the Album entity', async () => {
    await expect(element(by.id('albumScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('albumEditScrollView');
    await scrollTo('uuidInput', 'albumEditScrollView');
    await element(by.id('uuidInput')).replaceText('528c3976-f452-43da-988d-bfe3793f47c1');
    await scrollTo('nameInput', 'albumEditScrollView');
    await element(by.id('nameInput')).replaceText('calculating SMTP');
    await scrollTo('noteInput', 'albumEditScrollView');
    await element(by.id('noteInput')).replaceText('Crest Account Personal');
    await scrollTo('avatarInput', 'albumEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await element(by.id('albumEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'albumEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('albumDetailScrollView');
    await scrollTo('uuid', 'albumDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('528c3976-f452-43da-988d-bfe3793f47c1');
    await scrollTo('name', 'albumDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('calculating SMTP');
    await scrollTo('note', 'albumDetailScrollView');
    await expect(element(by.id('note'))).toHaveLabel('Crest Account Personal');
    await scrollTo('avatar', 'albumDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('albumEditButton', 'albumDetailScrollView');
    await tapFirstElementByLabel('Album Edit Button');
    await waitForElementToBeVisibleById('albumEditScrollView');
    await scrollTo('uuidInput', 'albumEditScrollView');
    await element(by.id('uuidInput')).replaceText('528c3976-f452-43da-988d-bfe3793f47c1');
    await scrollTo('nameInput', 'albumEditScrollView');
    await element(by.id('nameInput')).replaceText('calculating SMTP');
    await scrollTo('noteInput', 'albumEditScrollView');
    await element(by.id('noteInput')).replaceText('Crest Account Personal');
    await scrollTo('avatarInput', 'albumEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await element(by.id('albumEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'albumEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('albumDetailScrollView');
    await scrollTo('uuid', 'albumDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('528c3976-f452-43da-988d-bfe3793f47c1');
    await scrollTo('name', 'albumDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('calculating SMTP');
    await scrollTo('note', 'albumDetailScrollView');
    await expect(element(by.id('note'))).toHaveLabel('Crest Account Personal');
    await scrollTo('avatar', 'albumDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('albumDeleteButton', 'albumDetailScrollView');
    await waitThenTapButton('albumDeleteButton');
    await waitForElementToBeVisibleById('albumDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('albumScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
