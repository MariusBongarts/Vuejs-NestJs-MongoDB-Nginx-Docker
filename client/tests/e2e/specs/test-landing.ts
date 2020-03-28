import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';
// //////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
// //////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'it should render components of landing page': async (browser: NightwatchBrowser) => {
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@appContainer');
    LandingPage.waitForElementVisible('@getStartedBtn');
    LandingPage.waitForElementVisible('@infoContainer');
  },
  'it should navigate to /auth/sign-in after clicking getStarted button': async (browser: NightwatchBrowser) => {
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@getStartedBtn');
    LandingPage.click('@getStartedBtn');
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.waitForElementVisible('@container');
  },

};
