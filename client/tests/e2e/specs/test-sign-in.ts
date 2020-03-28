import { NightwatchBrowser, NightwatchCustomPageObjects, EnhancedPageObject } from 'nightwatch';

module.exports = {
  beforeEach: (browser: NightwatchBrowser) => browser.init(),

  'it should sign in successfully': async (browser: NightwatchBrowser) => {
    const homepage = browser.page.homepage() as EnhancedPageObject;
    homepage.waitForElementVisible('@appContainer');
    homepage.waitForElementVisible('@loginBtn');
    homepage.click('@loginBtn');
    homepage.waitForElementVisible('@overlay');
    homepage.waitForElementVisible('@emailInput');
    homepage.waitForElementVisible('@passwordInput');
    homepage.setValue('@emailInput', 'admin@skeleton.de');
    homepage.setValue('@passwordInput', 'MariusBongarts');
    homepage.click('@signInBtn');
    homepage.waitForElementVisible('@sideDrawer');
    browser.end();

  },
  'it should fail sign in because of invalid password': async (browser: NightwatchBrowser) => {
    const homepage = browser.page.homepage() as EnhancedPageObject;
    homepage.waitForElementVisible('@appContainer');
    homepage.waitForElementVisible('@loginBtn');
    homepage.click('@loginBtn');
    homepage.waitForElementVisible('@overlay');
    homepage.waitForElementVisible('@emailInput');
    homepage.waitForElementVisible('@passwordInput');
    homepage.setValue('@emailInput', 'admin@skeleton.de');
    homepage.setValue('@passwordInput', 'InvalidPassword');
    homepage.click('@signInBtn');
    homepage.waitForElementVisible('@errorMsg');
    homepage.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
    browser.end();
  },
  'it should fail sign in because of invalid email': async (browser) => {
    const homepage = browser.page.homepage() as EnhancedPageObject;
    homepage.waitForElementVisible('@appContainer');
    homepage.waitForElementVisible('@loginBtn');
    homepage.click('@loginBtn');
    homepage.waitForElementVisible('@overlay');
    homepage.waitForElementVisible('@emailInput');
    homepage.waitForElementVisible('@passwordInput');
    homepage.setValue('@emailInput', 'Invalid@email.de');
    homepage.setValue('@passwordInput', 'MariusBongarts');
    homepage.click('@signInBtn');
    homepage.waitForElementVisible('@errorMsg');
    homepage.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
    browser.end();
  },

};
