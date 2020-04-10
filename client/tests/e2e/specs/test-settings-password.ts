import { CONSTANTS } from './constants/constants';
import { NightwatchBrowser, EnhancedPageObject } from 'nightwatch';

module.exports = {

  beforeEach: (browser: NightwatchBrowser) => {
    browser.init();
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD, true);
    browser.page.Toolbar().navigateToProfile();
  },
  afterEach(browser) {
    browser.end();
  },
  'it should render all elements of change-password-container': (browser: NightwatchBrowser) => {
    const ProfileSettingsPassword = browser.page.ProfileSettingsPassword() as EnhancedPageObject;
    ProfileSettingsPassword.navigate(ProfileSettingsPassword['url']);
    ProfileSettingsPassword.waitForElementVisible('@container');
    ProfileSettingsPassword.waitForElementVisible('@oldPassword');
    ProfileSettingsPassword.waitForElementVisible('@newPassword');
    ProfileSettingsPassword.waitForElementVisible('@passwordRepeat');
    ProfileSettingsPassword.waitForElementVisible('@passwordSaveBtn');
  },
  'it should not show md-errors before filling out form': (browser: NightwatchBrowser) => {
    const ProfileSettingsPassword = browser.page.ProfileSettingsPassword() as EnhancedPageObject;
    ProfileSettingsPassword.waitForElementVisible('@container');
    ProfileSettingsPassword.expect.element('@passwordRequired').not.to.be.visible;
    ProfileSettingsPassword.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
  },
  'it should prevent change password because of constraints and show .md-errors': (browser: NightwatchBrowser) => {
    const ProfileSettingsPassword = browser.page.ProfileSettingsPassword() as EnhancedPageObject;
    ProfileSettingsPassword.waitForElementVisible('@container');
    ProfileSettingsPassword.click('@passwordSaveBtn');
    ProfileSettingsPassword.waitForElementVisible('@passwordRequired');
    ProfileSettingsPassword.sendKeys('@oldPassword', 'ValidPassword');
    ProfileSettingsPassword.sendKeys('@newPassword', 'NewPassword');
    ProfileSettingsPassword.sendKeys('@passwordRepeat', 'New');
    ProfileSettingsPassword.waitForElementVisible('@passwordRepeatNotMatch');
    ProfileSettingsPassword.expect.element('@passwordRequired').not.to.be.present;
    ProfileSettingsPassword.sendKeys('@passwordRepeat', 'Password');
    ProfileSettingsPassword.expect.element('@passwordRequired').not.to.be.present;
    ProfileSettingsPassword.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
  },
  'it should successfully change password, fail login with old credentials, and change password back': (browser: NightwatchBrowser) => {
    const ProfileSettingsPassword = browser.page.ProfileSettingsPassword() as EnhancedPageObject;
    ProfileSettingsPassword.sendKeys('@oldPassword', CONSTANTS.VALIDPASSWORD);
    ProfileSettingsPassword.sendKeys('@newPassword', CONSTANTS.NEWPASSWORDUSER);
    ProfileSettingsPassword.sendKeys('@passwordRepeat', CONSTANTS.NEWPASSWORDUSER);
    ProfileSettingsPassword.click('@passwordSaveBtn');
    browser.page.ProfileSettingsContainer().waitForElementVisible('@snackBarSuccess');
    browser.page.Toolbar().logout();
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.VALIDPASSWORD, false);
    browser.page.LandingPageAuthSignIn().signIn(CONSTANTS.VALIDEMAIL, CONSTANTS.NEWPASSWORDUSER, true);
    browser.page.Toolbar().navigateToProfile();
    ProfileSettingsPassword.sendKeys('@oldPassword', CONSTANTS.NEWPASSWORDUSER);
    ProfileSettingsPassword.sendKeys('@newPassword', CONSTANTS.VALIDPASSWORD);
    ProfileSettingsPassword.sendKeys('@passwordRepeat', CONSTANTS.VALIDPASSWORD);
    ProfileSettingsPassword.click('@passwordSaveBtn');
    browser.page.ProfileSettingsContainer().waitForElementVisible('@snackBarSuccess');
  },
  'it should fail to change password because old password is incorrect': (browser: NightwatchBrowser) => {
    const ProfileSettingsPassword = browser.page.ProfileSettingsPassword() as EnhancedPageObject;
    ProfileSettingsPassword.sendKeys('@oldPassword', 'IncorrectPassword');
    ProfileSettingsPassword.sendKeys('@newPassword', CONSTANTS.NEWPASSWORDUSER);
    ProfileSettingsPassword.sendKeys('@passwordRepeat', CONSTANTS.NEWPASSWORDUSER);
    ProfileSettingsPassword.click('@passwordSaveBtn');
    ProfileSettingsPassword.expect.element('@serverError').text.to.equal("Your old password is invalid!");
  }
};
