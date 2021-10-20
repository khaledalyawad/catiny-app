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

describe('AccountStatus Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToAccountStatusScreen();
  });

  const navigateToAccountStatusScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('accountStatusEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('accountStatusEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('accountStatusScreen');
  };

  it('should allow you to create, update, and delete the AccountStatus entity', async () => {
    await expect(element(by.id('accountStatusScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('accountStatusEditScrollView');
    await scrollTo('uuidInput', 'accountStatusEditScrollView');
    await element(by.id('uuidInput')).replaceText('ad894f7f-032c-42e3-9b86-f8cae7536d99');
    await scrollTo('accountStatusInput', 'accountStatusEditScrollView');
    await setPickerValue('accountStatusInput', 'TEMPORARILY_ABSENT');
    await scrollTo('lastVisitedInput', 'accountStatusEditScrollView');
    await setDateTimePickerValue('lastVisitedInput', '2021-10-19T18:37:00+07:00', 'ISO8601');
    await scrollTo('statusCommentInput', 'accountStatusEditScrollView');
    await element(by.id('statusCommentInput')).replaceText('Saint Fresh Towels');
    await element(by.id('accountStatusEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'accountStatusEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('accountStatusDetailScrollView');
    await scrollTo('uuid', 'accountStatusDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ad894f7f-032c-42e3-9b86-f8cae7536d99');
    await scrollTo('accountStatus', 'accountStatusDetailScrollView');
    await expect(element(by.id('accountStatus'))).toHaveLabel('TEMPORARILY_ABSENT');
    await scrollTo('lastVisited', 'accountStatusDetailScrollView');
    const lastVisitedCreateAttributes = await element(by.id('lastVisited')).getAttributes();
    jestExpect(Date.parse(lastVisitedCreateAttributes.label)).toEqual(Date.parse('2021-10-19T18:37:00+07:00'));
    await scrollTo('statusComment', 'accountStatusDetailScrollView');
    await expect(element(by.id('statusComment'))).toHaveLabel('Saint Fresh Towels');

    // update
    await scrollTo('accountStatusEditButton', 'accountStatusDetailScrollView');
    await tapFirstElementByLabel('AccountStatus Edit Button');
    await waitForElementToBeVisibleById('accountStatusEditScrollView');
    await scrollTo('uuidInput', 'accountStatusEditScrollView');
    await element(by.id('uuidInput')).replaceText('ad894f7f-032c-42e3-9b86-f8cae7536d99');
    await scrollTo('accountStatusInput', 'accountStatusEditScrollView');
    await setPickerValue('accountStatusInput', 'BUSY');
    await scrollTo('lastVisitedInput', 'accountStatusEditScrollView');
    await setDateTimePickerValue('lastVisitedInput', '2021-10-20T04:33:00+07:00', 'ISO8601');
    await scrollTo('statusCommentInput', 'accountStatusEditScrollView');
    await element(by.id('statusCommentInput')).replaceText('Saint Fresh Towels');
    await element(by.id('accountStatusEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'accountStatusEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('accountStatusDetailScrollView');
    await scrollTo('uuid', 'accountStatusDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('ad894f7f-032c-42e3-9b86-f8cae7536d99');
    await scrollTo('accountStatus', 'accountStatusDetailScrollView');
    await expect(element(by.id('accountStatus'))).toHaveLabel('BUSY');
    await scrollTo('lastVisited', 'accountStatusDetailScrollView');
    const lastVisitedUpdateAttributes = await element(by.id('lastVisited')).getAttributes();
    jestExpect(Date.parse(lastVisitedUpdateAttributes.label)).toEqual(Date.parse('2021-10-20T04:33:00+07:00'));
    await scrollTo('statusComment', 'accountStatusDetailScrollView');
    await expect(element(by.id('statusComment'))).toHaveLabel('Saint Fresh Towels');

    // delete
    await scrollTo('accountStatusDeleteButton', 'accountStatusDetailScrollView');
    await waitThenTapButton('accountStatusDeleteButton');
    await waitForElementToBeVisibleById('accountStatusDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('accountStatusScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
