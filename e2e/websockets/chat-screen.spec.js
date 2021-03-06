const {
  reloadApp,
  loginAsUser,
  logout,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
} = require('../utils');

describe('Chat Screen Tests', () => {
  beforeAll(async () => {
    await reloadApp();
    await loginAsUser();
  });

  afterAll(async () => {
    await logout();
  });

  beforeEach(async () => {
    await reloadApp();
    await openAndTapDrawerMenuItemByLabel('Chat');
    await waitForElementToBeVisibleById('chatScreen');
  });

  const sendChat = async (message) => {
    await element(by.id('chatScreenInput')).replaceText(message);
    await waitThenTapButton('chatScreenSendButton');
  };

  it('should send a chat message then display it', async () => {
    await sendChat('Java Hipster');
    await waitForElementToBeVisibleById('message-0');
    await expect(element(by.label('Java Hipster'))).toBeVisible();
  });
});
