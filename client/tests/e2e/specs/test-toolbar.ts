import { CONSTANTS } from './constants/constants';
import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';


module.exports = {
  beforeEach: (browser) => browser.init(),
  afterEach(browser) {
    browser.end();
  },

  'it should logout': async (browser: NightwatchBrowser) => {
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD, true);
    const Toolbar = browser.page.Toolbar() as EnhancedPageObject;
    Toolbar.waitForElementVisible('@container');
    Toolbar.expect.element('@emailCaption').text.to.equal(CONSTANTS.VALIDEMAIL.toLowerCase());
    Toolbar.click('@avatar');
    Toolbar.click('@logoutBtn');
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@getStartedBtn');
  },
  'it should navigate to profile': async (browser: NightwatchBrowser) => {
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD, true);
    const Toolbar = browser.page.Toolbar() as EnhancedPageObject;
    Toolbar.waitForElementVisible('@container');
    Toolbar.click('@avatar');
    Toolbar.click('@profileBtn');
    const ProfileSettingsContainer = browser.page.ProfileSettingsContainer() as EnhancedPageObject;
    ProfileSettingsContainer.waitForElementVisible('@container');
  },

};
