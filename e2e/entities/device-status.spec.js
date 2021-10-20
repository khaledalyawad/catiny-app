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

describe('DeviceStatus Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToDeviceStatusScreen();
  });

  const navigateToDeviceStatusScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('deviceStatusEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('deviceStatusEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('deviceStatusScreen');
  };

  it('should allow you to create, update, and delete the DeviceStatus entity', async () => {
    await expect(element(by.id('deviceStatusScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('deviceStatusEditScrollView');
    await scrollTo('uuidInput', 'deviceStatusEditScrollView');
    await element(by.id('uuidInput')).replaceText('ef219946-0bc1-4d1a-9d1b-12a9e5580fdd');
    await scrollTo('deviceNameInput', 'deviceStatusEditScrollView');
    await element(by.id('deviceNameInput')).replaceText('end-to-end user-centric Road');
    await scrollTo('deviceTypeInput', 'deviceStatusEditScrollView');
    await setPickerValue('deviceTypeInput', 'MOBILE');
    await scrollTo('deviceStatusInput', 'deviceStatusEditScrollView');
    await setPickerValue('deviceStatusInput', 'ONLINE');
    await scrollTo('lastVisitedInput', 'deviceStatusEditScrollView');
    await setDateTimePickerValue('lastVisitedInput', '2021-10-19T16:53:00+07:00', 'ISO8601');
    await scrollTo('statusCommentInput', 'deviceStatusEditScrollView');
    await element(by.id('statusCommentInput')).replaceText('Australian');
    await element(by.id('deviceStatusEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'deviceStatusEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('deviceStatusDetailScrollView');
    await scrollTo('uuid', 'deviceStatusDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ef219946-0bc1-4d1a-9d1b-12a9e5580fdd');
    await scrollTo('deviceName', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceName'))).toHaveLabel('end-to-end user-centric Road');
    await scrollTo('deviceType', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceType'))).toHaveLabel('MOBILE');
    await scrollTo('deviceStatus', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceStatus'))).toHaveLabel('ONLINE');
    await scrollTo('lastVisited', 'deviceStatusDetailScrollView');
    const lastVisitedCreateAttributes = await element(by.id('lastVisited')).getAttributes();
    jestExpect(Date.parse(lastVisitedCreateAttributes.label)).toEqual(Date.parse('2021-10-19T16:53:00+07:00'));
    await scrollTo('statusComment', 'deviceStatusDetailScrollView');
    await expect(element(by.id('statusComment'))).toHaveLabel('Australian');

    // update
    await scrollTo('deviceStatusEditButton', 'deviceStatusDetailScrollView');
    await tapFirstElementByLabel('DeviceStatus Edit Button');
    await waitForElementToBeVisibleById('deviceStatusEditScrollView');
    await scrollTo('uuidInput', 'deviceStatusEditScrollView');
    await element(by.id('uuidInput')).replaceText('ef219946-0bc1-4d1a-9d1b-12a9e5580fdd');
    await scrollTo('deviceNameInput', 'deviceStatusEditScrollView');
    await element(by.id('deviceNameInput')).replaceText('end-to-end user-centric Road');
    await scrollTo('deviceTypeInput', 'deviceStatusEditScrollView');
    await setPickerValue('deviceTypeInput', 'MOBILE');
    await scrollTo('deviceStatusInput', 'deviceStatusEditScrollView');
    await setPickerValue('deviceStatusInput', 'ONLINE');
    await scrollTo('lastVisitedInput', 'deviceStatusEditScrollView');
    await setDateTimePickerValue('lastVisitedInput', '2021-10-19T19:58:00+07:00', 'ISO8601');
    await scrollTo('statusCommentInput', 'deviceStatusEditScrollView');
    await element(by.id('statusCommentInput')).replaceText('Australian');
    await element(by.id('deviceStatusEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'deviceStatusEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('deviceStatusDetailScrollView');
    await scrollTo('uuid', 'deviceStatusDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ef219946-0bc1-4d1a-9d1b-12a9e5580fdd');
    await scrollTo('deviceName', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceName'))).toHaveLabel('end-to-end user-centric Road');
    await scrollTo('deviceType', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceType'))).toHaveLabel('MOBILE');
    await scrollTo('deviceStatus', 'deviceStatusDetailScrollView');
    await expect(element(by.id('deviceStatus'))).toHaveLabel('ONLINE');
    await scrollTo('lastVisited', 'deviceStatusDetailScrollView');
    const lastVisitedUpdateAttributes = await element(by.id('lastVisited')).getAttributes();
    jestExpect(Date.parse(lastVisitedUpdateAttributes.label)).toEqual(Date.parse('2021-10-19T19:58:00+07:00'));
    await scrollTo('statusComment', 'deviceStatusDetailScrollView');
    await expect(element(by.id('statusComment'))).toHaveLabel('Australian');

    // delete
    await scrollTo('deviceStatusDeleteButton', 'deviceStatusDetailScrollView');
    await waitThenTapButton('deviceStatusDeleteButton');
    await waitForElementToBeVisibleById('deviceStatusDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('deviceStatusScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
