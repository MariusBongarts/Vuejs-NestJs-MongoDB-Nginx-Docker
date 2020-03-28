import { CONSTANTS } from './constants/constants';
import { NightwatchBrowser, EnhancedPageObject } from 'nightwatch';

module.exports = {

  beforeEach: (browser: NightwatchBrowser) => {
    browser.init();
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.navigate(LandingPageAuthSignUp['url']);
  },
  'it should render overlay': (browser: NightwatchBrowser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.waitForElementVisible('@overlay');
    LandingPageAuthSignUp.waitForElementVisible('@emailInput');
    LandingPageAuthSignUp.waitForElementVisible('@passwordInput');
    LandingPageAuthSignUp.waitForElementVisible('@signUpBtn');
    LandingPageAuthSignUp.waitForElementVisible('@signInBtn');
  },
  'it should not show md-errors in sign-up form before filling out form': (browser: NightwatchBrowser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.expect.element('@emailRequired').not.to.be.visible;
    LandingPageAuthSignUp.expect.element('@emailInvalid').not.to.be.present;
    LandingPageAuthSignUp.expect.element('@passwordRequired').not.to.be.visible;
    LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
  },
  'it should prevent sign up because of constraints and show .md-errors': (browser: NightwatchBrowser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.click('@signUpBtn');
    LandingPageAuthSignUp.waitForElementVisible('@emailRequired');
    LandingPageAuthSignUp.waitForElementVisible('@passwordRequired');
    LandingPageAuthSignUp.waitForElementVisible('@emailRequired');
    LandingPageAuthSignUp.expect.element('@emailRequired').text.to.equal("E-Mail is required");
    LandingPageAuthSignUp.sendKeys('@emailInput', 'test');
    LandingPageAuthSignUp.waitForElementVisible('@emailInvalid');
    LandingPageAuthSignUp.expect.element('@emailInvalid').text.to.equal("Please enter a valid email!");
    LandingPageAuthSignUp.clearValue('@emailInput');
    LandingPageAuthSignUp.sendKeys('@emailInput', CONSTANTS.NEWEMAILUSER);
    LandingPageAuthSignUp.expect.element('@emailInvalid').not.to.be.present;
    LandingPageAuthSignUp.sendKeys('@passwordInput', CONSTANTS.NEWPASSWORDUSER);
    LandingPageAuthSignUp.waitForElementVisible('@passwordRepeatNotMatch');
    LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').text.to.equal("Passwords do not match!");
    LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', CONSTANTS.NEWPASSWORDUSER);
    LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
    LandingPageAuthSignUp.sendKeys('@passwordInput', 'notTheSamePassword');
    LandingPageAuthSignUp.waitForElementVisible('@passwordRepeatNotMatch');
  },
  'it should fail sign-up because email is already registered': async (browser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.sendKeys('@emailInput', CONSTANTS.VALIDEMAIL);
    LandingPageAuthSignUp.sendKeys('@passwordInput', CONSTANTS.VALIDPASSWORD);
    LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', CONSTANTS.VALIDPASSWORD);
    LandingPageAuthSignUp.click('@signUpBtn');
    LandingPageAuthSignUp.waitForElementVisible('@errorMsg');
    LandingPageAuthSignUp.expect.element('@errorMsg').text.to.equal("Email is already registered!");
    browser.end();
  },
  'it should successfully create a new user': async (browser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.sendKeys('@emailInput', CONSTANTS.NEWEMAILUSER);
    LandingPageAuthSignUp.sendKeys('@passwordInput', CONSTANTS.NEWPASSWORDUSER);
    LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', CONSTANTS.NEWPASSWORDUSER);
    LandingPageAuthSignUp.click('@signUpBtn');
    const App = browser.page.App() as EnhancedPageObject;
    App.waitForElementVisible('@container');
    browser.end();
  },
  'it should navigate to sign-in': async (browser) => {
    const LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp() as EnhancedPageObject;
    LandingPageAuthSignUp.click('@signInBtn');
    const LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn() as EnhancedPageObject;
    LandingPageAuthSignIn.waitForElementVisible('@container');
    browser.end();
  },

};
