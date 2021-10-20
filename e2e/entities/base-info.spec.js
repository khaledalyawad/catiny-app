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

describe('BaseInfo Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToBaseInfoScreen();
  });

  const navigateToBaseInfoScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('baseInfoEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('baseInfoEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('baseInfoScreen');
  };

  it('should allow you to create, update, and delete the BaseInfo entity', async () => {
    await expect(element(by.id('baseInfoScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('baseInfoEditScrollView');
    await scrollTo('uuidInput', 'baseInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('c5c73a44-13d3-4678-9845-20bc8ed667d3');
    await scrollTo('processStatusInput', 'baseInfoEditScrollView');
    await setPickerValue('processStatusInput', 'NOT_PROCESSED');
    await scrollTo('modifiedClassInput', 'baseInfoEditScrollView');
    await element(by.id('modifiedClassInput')).replaceText('invoice Qatar Mountains');
    await scrollTo('createdDateInput', 'baseInfoEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2021-10-20T02:10:00+07:00', 'ISO8601');
    await scrollTo('modifiedDateInput', 'baseInfoEditScrollView');
    await setDateTimePickerValue('modifiedDateInput', '2021-10-19T14:00:00+07:00', 'ISO8601');
    await scrollTo('notesInput', 'baseInfoEditScrollView');
    await element(by.id('notesInput')).replaceText('long-text-blob-content');
    await scrollTo('deletedInput', 'baseInfoEditScrollView');
    await toggleSwitchToValue('deletedInput', false);
    await scrollTo('priorityIndexInput', 'baseInfoEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('90314');
    await scrollTo('countUseInput', 'baseInfoEditScrollView');
    await element(by.id('countUseInput')).replaceText('91934');
    await element(by.id('baseInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'baseInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('baseInfoDetailScrollView');
    await scrollTo('uuid', 'baseInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c5c73a44-13d3-4678-9845-20bc8ed667d3');
    await scrollTo('processStatus', 'baseInfoDetailScrollView');
    await expect(element(by.id('processStatus'))).toHaveLabel('NOT_PROCESSED');
    await scrollTo('modifiedClass', 'baseInfoDetailScrollView');
    await expect(element(by.id('modifiedClass'))).toHaveLabel('invoice Qatar Mountains');
    await scrollTo('createdDate', 'baseInfoDetailScrollView');
    const createdDateCreateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateCreateAttributes.label)).toEqual(Date.parse('2021-10-20T02:10:00+07:00'));
    await scrollTo('modifiedDate', 'baseInfoDetailScrollView');
    const modifiedDateCreateAttributes = await element(by.id('modifiedDate')).getAttributes();
    jestExpect(Date.parse(modifiedDateCreateAttributes.label)).toEqual(Date.parse('2021-10-19T14:00:00+07:00'));
    await scrollTo('notes', 'baseInfoDetailScrollView');
    await expect(element(by.id('notes'))).toHaveLabel('long-text-blob-content');
    await scrollTo('deleted', 'baseInfoDetailScrollView');
    await expect(element(by.id('deleted'))).toHaveLabel('false');
    await scrollTo('priorityIndex', 'baseInfoDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('90314');
    await scrollTo('countUse', 'baseInfoDetailScrollView');
    await expect(element(by.id('countUse'))).toHaveLabel('91934');

    // update
    await scrollTo('baseInfoEditButton', 'baseInfoDetailScrollView');
    await tapFirstElementByLabel('BaseInfo Edit Button');
    await waitForElementToBeVisibleById('baseInfoEditScrollView');
    await scrollTo('uuidInput', 'baseInfoEditScrollView');
    await element(by.id('uuidInput')).replaceText('c5c73a44-13d3-4678-9845-20bc8ed667d3');
    await scrollTo('processStatusInput', 'baseInfoEditScrollView');
    await setPickerValue('processStatusInput', 'NEED_HANDLE');
    await scrollTo('modifiedClassInput', 'baseInfoEditScrollView');
    await element(by.id('modifiedClassInput')).replaceText('invoice Qatar Mountains');
    await scrollTo('createdDateInput', 'baseInfoEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2021-10-19T16:00:00+07:00', 'ISO8601');
    await scrollTo('modifiedDateInput', 'baseInfoEditScrollView');
    await setDateTimePickerValue('modifiedDateInput', '2021-10-19T14:32:00+07:00', 'ISO8601');
    await scrollTo('notesInput', 'baseInfoEditScrollView');
    await element(by.id('notesInput')).replaceText('long-text-blob-content-2');
    await scrollTo('deletedInput', 'baseInfoEditScrollView');
    await toggleSwitchToValue('deletedInput', true);
    await scrollTo('priorityIndexInput', 'baseInfoEditScrollView');
    await element(by.id('priorityIndexInput')).replaceText('9390');
    await scrollTo('countUseInput', 'baseInfoEditScrollView');
    await element(by.id('countUseInput')).replaceText('82516');
    await element(by.id('baseInfoEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'baseInfoEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('baseInfoDetailScrollView');
    await scrollTo('uuid', 'baseInfoDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('c5c73a44-13d3-4678-9845-20bc8ed667d3');
    await scrollTo('processStatus', 'baseInfoDetailScrollView');
    await expect(element(by.id('processStatus'))).toHaveLabel('NEED_HANDLE');
    await scrollTo('modifiedClass', 'baseInfoDetailScrollView');
    await expect(element(by.id('modifiedClass'))).toHaveLabel('invoice Qatar Mountains');
    await scrollTo('createdDate', 'baseInfoDetailScrollView');
    const createdDateUpdateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateUpdateAttributes.label)).toEqual(Date.parse('2021-10-19T16:00:00+07:00'));
    await scrollTo('modifiedDate', 'baseInfoDetailScrollView');
    const modifiedDateUpdateAttributes = await element(by.id('modifiedDate')).getAttributes();
    jestExpect(Date.parse(modifiedDateUpdateAttributes.label)).toEqual(Date.parse('2021-10-19T14:32:00+07:00'));
    await scrollTo('notes', 'baseInfoDetailScrollView');
    await expect(element(by.id('notes'))).toHaveLabel('long-text-blob-content-2');
    await scrollTo('deleted', 'baseInfoDetailScrollView');
    await expect(element(by.id('deleted'))).toHaveLabel('true');
    await scrollTo('priorityIndex', 'baseInfoDetailScrollView');
    await expect(element(by.id('priorityIndex'))).toHaveLabel('9390');
    await scrollTo('countUse', 'baseInfoDetailScrollView');
    await expect(element(by.id('countUse'))).toHaveLabel('82516');

    // delete
    await scrollTo('baseInfoDeleteButton', 'baseInfoDetailScrollView');
    await waitThenTapButton('baseInfoDeleteButton');
    await waitForElementToBeVisibleById('baseInfoDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('baseInfoScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
