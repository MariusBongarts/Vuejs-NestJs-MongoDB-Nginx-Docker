import { CONSTANTS } from './constants/constants';
import { NightwatchBrowser, NightwatchCustomPageObjects, EnhancedPageObject, EnhancedSectionInstance } from 'nightwatch';

module.exports = {

  beforeEach: (browser: NightwatchBrowser) => {
    browser.init();
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.navigate(LandingPageAuthSignIn['url']);
  },

  'it should render overlay': (browser: NightwatchBrowser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.waitForElementVisible('@overlay');
  },
  'it should sign in successfully': (browser: NightwatchBrowser) => {
    signIn(browser, CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD);
    const App = browser.page.App() as EnhancedPageObject;
    App.waitForElementVisible('@container');
    browser.end();
  },
  'it should fail sign in because of invalid password': async (browser: NightwatchBrowser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    signIn(browser, CONSTANTS.VALIDEMAIL, CONSTANTS.INVALIDPASSWORD);
    LandingPageAuthSignIn.waitForElementVisible('@errorMsg');
    LandingPageAuthSignIn.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
    browser.end();
  },
  'it should fail sign in because of invalid email': async (browser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    signIn(browser, CONSTANTS.INVALIDEMAIL, CONSTANTS.VALIDPASSWORD);
    LandingPageAuthSignIn.waitForElementVisible('@errorMsg');
    LandingPageAuthSignIn.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
    browser.end();
  },
  'it should not show md-errors in sign in form before filling out form': (browser: NightwatchBrowser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.expect.element('@emailRequired').not.to.be.visible;
    LandingPageAuthSignIn.expect.element('@emailInvalid').not.to.be.present;
    LandingPageAuthSignIn.expect.element('@passwordRequired').not.to.be.visible;
  },
  'it should supress sign in because of constraints and show .md-errors': async (browser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    signIn(browser, '', '');
    LandingPageAuthSignIn.waitForElementVisible('@emailRequired');
    LandingPageAuthSignIn.waitForElementVisible('@passwordRequired');
    LandingPageAuthSignIn.expect.element('@emailRequired').text.to.equal("E-Mail is required");
    LandingPageAuthSignIn.expect.element('@passwordRequired').text.to.equal("Password is required");
    LandingPageAuthSignIn.sendKeys('@emailInput', 'invalidEmail@web.d');
    LandingPageAuthSignIn.expect.element('@emailInvalid').text.to.equal("Please enter a valid email!");
    LandingPageAuthSignIn.clearValue('@emailInput');
    LandingPageAuthSignIn.sendKeys('@emailInput', CONSTANTS.VALIDEMAIL);
    LandingPageAuthSignIn.sendKeys('@passwordInput', CONSTANTS.VALIDPASSWORD);
    LandingPageAuthSignIn.expect.element('@emailRequired').not.to.be.present;
    LandingPageAuthSignIn.expect.element('@emailInvalid').not.to.be.present;
    LandingPageAuthSignIn.expect.element('@passwordRequired').not.to.be.present;
    browser.end();
  },
  'it should navigate to sign-up': async (browser) => {
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.click('@signUpBtn');
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.waitForElementVisible('@container');
    browser.end();
  },

};

export function signIn(browser: NightwatchBrowser, email: string, password: string) {
  const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
  LandingPageAuthSignIn.waitForElementVisible('@container');
  LandingPageAuthSignIn.waitForElementVisible('@emailInput');
  LandingPageAuthSignIn.waitForElementVisible('@passwordInput');
  LandingPageAuthSignIn.sendKeys('@emailInput', email);
  LandingPageAuthSignIn.sendKeys('@passwordInput', password);
  LandingPageAuthSignIn.click('@signInBtn');
}