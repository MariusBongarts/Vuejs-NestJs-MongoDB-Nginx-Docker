import { CONSTANTS } from './constants/constants';
import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';


module.exports = {
  beforeEach: (browser) => browser.init(),

  'it should logout': async (browser: NightwatchBrowser) => {
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD);
    const Toolbar = browser.page.Toolbar() as EnhancedPageObject;
    Toolbar.waitForElementVisible('@container');
    Toolbar.click('@avatar');
    Toolbar.click('@logoutBtn');
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@getStartedBtn');
  },

};
