import { CONSTANTS } from './constants/constants';
import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';

module.exports = {
  beforeEach: (browser: NightwatchBrowser) => browser.init(),

  'it should redirect to landing page when navigating to home because user is not logged in': async (browser: NightwatchBrowser) => {
    const HomePage = browser.page.HomePage() as EnhancedPageObject;
    HomePage.navigate(HomePage['url']);
    HomePage.expect.url(url => url).not.to.contain('home');
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@getStartedBtn');

  },
  'it should redirect to landing page after deleting JSON Web Token from localstorage': async (browser: NightwatchBrowser) => {
    const NavBar = browser.page.NavBar() as EnhancedPageObject;
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD);
    // Wait for localStorage to be set from sign in
    browser.pause(1000);
    browser.execute(() => localStorage.clear());
    NavBar.waitForElementVisible('@calendarNavItem');
    NavBar.click('@calendarNavItem');
    const HomePage = browser.page.HomePage() as EnhancedPageObject;
    HomePage.expect.url(url => url).not.to.contain('calendar');
    const LandingPage = browser.page.LandingPage() as EnhancedPageObject;
    LandingPage.waitForElementVisible('@getStartedBtn');
  },

};