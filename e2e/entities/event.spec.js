const jestExpect = require('expect');
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
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Event Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToEventScreen();
  });

  const navigateToEventScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('eventEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('eventEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('eventScreen');
  };

  it('should allow you to create, update, and delete the Event entity', async () => {
    await expect(element(by.id('eventScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('eventEditScrollView');
    await scrollTo('uuidInput', 'eventEditScrollView');
    await element(by.id('uuidInput')).replaceText('90863f21-d5d2-45af-b865-0ccab2fc1ebe');
    await scrollTo('titleInput', 'eventEditScrollView');
    await element(by.id('titleInput')).replaceText('Som');
    await scrollTo('avatarInput', 'eventEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content');
    await scrollTo('contentInput', 'eventEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await scrollTo('typeInput', 'eventEditScrollView');
    await setPickerValue('typeInput', 'YEAR');
    await scrollTo('descriptionInput', 'eventEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content');
    await scrollTo('startTimeInput', 'eventEditScrollView');
    await setDateTimePickerValue('startTimeInput', '2021-10-19T23:29:00+07:00', 'ISO8601');
    await scrollTo('endTimeInput', 'eventEditScrollView');
    await setDateTimePickerValue('endTimeInput', '2021-10-19T21:20:00+07:00', 'ISO8601');
    await scrollTo('tagLineInput', 'eventEditScrollView');
    await element(by.id('tagLineInput')).replaceText('revolutionize backing');
    await scrollTo('imageCollectionInput', 'eventEditScrollView');
    await element(by.id('imageCollectionInput')).replaceText('long-text-blob-content');
    await scrollTo('videoCollectionInput', 'eventEditScrollView');
    await element(by.id('videoCollectionInput')).replaceText('long-text-blob-content');
    await element(by.id('eventEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'eventEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('eventDetailScrollView');
    await scrollTo('uuid', 'eventDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('90863f21-d5d2-45af-b865-0ccab2fc1ebe');
    await scrollTo('title', 'eventDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Som');
    await scrollTo('avatar', 'eventDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content');
    await scrollTo('content', 'eventDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');
    await scrollTo('type', 'eventDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('YEAR');
    await scrollTo('description', 'eventDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content');
    await scrollTo('startTime', 'eventDetailScrollView');
    const startTimeCreateAttributes = await element(by.id('startTime')).getAttributes();
    jestExpect(Date.parse(startTimeCreateAttributes.label)).toEqual(Date.parse('2021-10-19T23:29:00+07:00'));
    await scrollTo('endTime', 'eventDetailScrollView');
    const endTimeCreateAttributes = await element(by.id('endTime')).getAttributes();
    jestExpect(Date.parse(endTimeCreateAttributes.label)).toEqual(Date.parse('2021-10-19T21:20:00+07:00'));
    await scrollTo('tagLine', 'eventDetailScrollView');
    await expect(element(by.id('tagLine'))).toHaveLabel('revolutionize backing');
    await scrollTo('imageCollection', 'eventDetailScrollView');
    await expect(element(by.id('imageCollection'))).toHaveLabel('long-text-blob-content');
    await scrollTo('videoCollection', 'eventDetailScrollView');
    await expect(element(by.id('videoCollection'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('eventEditButton', 'eventDetailScrollView');
    await tapFirstElementByLabel('Event Edit Button');
    await waitForElementToBeVisibleById('eventEditScrollView');
    await scrollTo('uuidInput', 'eventEditScrollView');
    await element(by.id('uuidInput')).replaceText('90863f21-d5d2-45af-b865-0ccab2fc1ebe');
    await scrollTo('titleInput', 'eventEditScrollView');
    await element(by.id('titleInput')).replaceText('Som');
    await scrollTo('avatarInput', 'eventEditScrollView');
    await element(by.id('avatarInput')).replaceText('long-text-blob-content-2');
    await scrollTo('contentInput', 'eventEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await scrollTo('typeInput', 'eventEditScrollView');
    await setPickerValue('typeInput', 'DAY');
    await scrollTo('descriptionInput', 'eventEditScrollView');
    await element(by.id('descriptionInput')).replaceText('long-text-blob-content-2');
    await scrollTo('startTimeInput', 'eventEditScrollView');
    await setDateTimePickerValue('startTimeInput', '2021-10-19T20:51:00+07:00', 'ISO8601');
    await scrollTo('endTimeInput', 'eventEditScrollView');
    await setDateTimePickerValue('endTimeInput', '2021-10-19T18:40:00+07:00', 'ISO8601');
    await scrollTo('tagLineInput', 'eventEditScrollView');
    await element(by.id('tagLineInput')).replaceText('revolutionize backing');
    await scrollTo('imageCollectionInput', 'eventEditScrollView');
    await element(by.id('imageCollectionInput')).replaceText('long-text-blob-content-2');
    await scrollTo('videoCollectionInput', 'eventEditScrollView');
    await element(by.id('videoCollectionInput')).replaceText('long-text-blob-content-2');
    await element(by.id('eventEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'eventEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('eventDetailScrollView');
    await scrollTo('uuid', 'eventDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('90863f21-d5d2-45af-b865-0ccab2fc1ebe');
    await scrollTo('title', 'eventDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Som');
    await scrollTo('avatar', 'eventDetailScrollView');
    await expect(element(by.id('avatar'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('content', 'eventDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('type', 'eventDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('DAY');
    await scrollTo('description', 'eventDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('startTime', 'eventDetailScrollView');
    const startTimeUpdateAttributes = await element(by.id('startTime')).getAttributes();
    jestExpect(Date.parse(startTimeUpdateAttributes.label)).toEqual(Date.parse('2021-10-19T20:51:00+07:00'));
    await scrollTo('endTime', 'eventDetailScrollView');
    const endTimeUpdateAttributes = await element(by.id('endTime')).getAttributes();
    jestExpect(Date.parse(endTimeUpdateAttributes.label)).toEqual(Date.parse('2021-10-19T18:40:00+07:00'));
    await scrollTo('tagLine', 'eventDetailScrollView');
    await expect(element(by.id('tagLine'))).toHaveLabel('revolutionize backing');
    await scrollTo('imageCollection', 'eventDetailScrollView');
    await expect(element(by.id('imageCollection'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('videoCollection', 'eventDetailScrollView');
    await expect(element(by.id('videoCollection'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('eventDeleteButton', 'eventDetailScrollView');
    await waitThenTapButton('eventDeleteButton');
    await waitForElementToBeVisibleById('eventDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('eventScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
