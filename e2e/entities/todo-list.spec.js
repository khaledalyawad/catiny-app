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

describe('TodoList Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTodoListScreen();
  });

  const navigateToTodoListScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('todoListEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('todoListEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('todoListScreen');
  };

  it('should allow you to create, update, and delete the TodoList entity', async () => {
    await expect(element(by.id('todoListScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('todoListEditScrollView');
    await scrollTo('uuidInput', 'todoListEditScrollView');
    await element(by.id('uuidInput')).replaceText('b54ff939-b547-4bca-968e-d944d3e3dc5d');
    await scrollTo('titleInput', 'todoListEditScrollView');
    await element(by.id('titleInput')).replaceText('out-of-the-box Plastic Toys');
    await scrollTo('contentInput', 'todoListEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content');
    await element(by.id('todoListEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'todoListEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('todoListDetailScrollView');
    await scrollTo('uuid', 'todoListDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('b54ff939-b547-4bca-968e-d944d3e3dc5d');
    await scrollTo('title', 'todoListDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('out-of-the-box Plastic Toys');
    await scrollTo('content', 'todoListDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content');

    // update
    await scrollTo('todoListEditButton', 'todoListDetailScrollView');
    await tapFirstElementByLabel('TodoList Edit Button');
    await waitForElementToBeVisibleById('todoListEditScrollView');
    await scrollTo('uuidInput', 'todoListEditScrollView');
    await element(by.id('uuidInput')).replaceText('b54ff939-b547-4bca-968e-d944d3e3dc5d');
    await scrollTo('titleInput', 'todoListEditScrollView');
    await element(by.id('titleInput')).replaceText('out-of-the-box Plastic Toys');
    await scrollTo('contentInput', 'todoListEditScrollView');
    await element(by.id('contentInput')).replaceText('long-text-blob-content-2');
    await element(by.id('todoListEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'todoListEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('todoListDetailScrollView');
    await scrollTo('uuid', 'todoListDetailScrollView');
    await expect(element(by.id('uuid'))).toHaveLabel('b54ff939-b547-4bca-968e-d944d3e3dc5d');
    await scrollTo('title', 'todoListDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('out-of-the-box Plastic Toys');
    await scrollTo('content', 'todoListDetailScrollView');
    await expect(element(by.id('content'))).toHaveLabel('long-text-blob-content-2');

    // delete
    await scrollTo('todoListDeleteButton', 'todoListDetailScrollView');
    await waitThenTapButton('todoListDeleteButton');
    await waitForElementToBeVisibleById('todoListDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('todoListScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
