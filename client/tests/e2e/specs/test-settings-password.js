"use strict";
exports.__esModule = true;
var constants_1 = require("./constants/constants");
module.exports = {
    beforeEach: function (browser) {
        browser.init();
        browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.VALIDEMAIL, constants_1.CONSTANTS.VALIDPASSWORD, true);
        browser.page.Toolbar().navigateToProfile();
    },
    afterEach: function (browser) {
        browser.end();
    },
    'it should render all elements of change-password-container': function (browser) {
        var ProfileSettingsPassword = browser.page.ProfileSettingsPassword();
        ProfileSettingsPassword.navigate(ProfileSettingsPassword['url']);
        ProfileSettingsPassword.waitForElementVisible('@container');
        ProfileSettingsPassword.waitForElementVisible('@oldPassword');
        ProfileSettingsPassword.waitForElementVisible('@newPassword');
        ProfileSettingsPassword.waitForElementVisible('@passwordRepeat');
        ProfileSettingsPassword.waitForElementVisible('@passwordSaveBtn');
    },
    'it should not show md-errors before filling out form': function (browser) {
        var ProfileSettingsPassword = browser.page.ProfileSettingsPassword();
        ProfileSettingsPassword.waitForElementVisible('@container');
        ProfileSettingsPassword.expect.element('@passwordRequired').not.to.be.visible;
        ProfileSettingsPassword.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
    },
    'it should prevent change password because of constraints and show .md-errors': function (browser) {
        var ProfileSettingsPassword = browser.page.ProfileSettingsPassword();
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
    'it should successfully change password, fail login with old credentials, and change password back': function (browser) {
        var ProfileSettingsPassword = browser.page.ProfileSettingsPassword();
        ProfileSettingsPassword.sendKeys('@oldPassword', constants_1.CONSTANTS.VALIDPASSWORD);
        ProfileSettingsPassword.sendKeys('@newPassword', constants_1.CONSTANTS.NEWPASSWORDUSER);
        ProfileSettingsPassword.sendKeys('@passwordRepeat', constants_1.CONSTANTS.NEWPASSWORDUSER);
        ProfileSettingsPassword.click('@passwordSaveBtn');
        browser.page.ProfileSettingsContainer().waitForElementVisible('@snackBarSuccess');
        browser.page.Toolbar().logout();
        browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.VALIDEMAIL, constants_1.CONSTANTS.VALIDPASSWORD, false);
        browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.VALIDEMAIL, constants_1.CONSTANTS.NEWPASSWORDUSER, true);
        browser.page.Toolbar().navigateToProfile();
        ProfileSettingsPassword.sendKeys('@oldPassword', constants_1.CONSTANTS.NEWPASSWORDUSER);
        ProfileSettingsPassword.sendKeys('@newPassword', constants_1.CONSTANTS.VALIDPASSWORD);
        ProfileSettingsPassword.sendKeys('@passwordRepeat', constants_1.CONSTANTS.VALIDPASSWORD);
        ProfileSettingsPassword.click('@passwordSaveBtn');
        browser.page.ProfileSettingsContainer().waitForElementVisible('@snackBarSuccess');
    },
    'it should fail to change password because old password is incorrect': function (browser) {
        var ProfileSettingsPassword = browser.page.ProfileSettingsPassword();
        ProfileSettingsPassword.sendKeys('@oldPassword', 'IncorrectPassword');
        ProfileSettingsPassword.sendKeys('@newPassword', constants_1.CONSTANTS.NEWPASSWORDUSER);
        ProfileSettingsPassword.sendKeys('@passwordRepeat', constants_1.CONSTANTS.NEWPASSWORDUSER);
        ProfileSettingsPassword.click('@passwordSaveBtn');
        browser.page.ProfileSettingsContainer().waitForElementVisible('@snackBarError');
        ProfileSettingsPassword.expect.element('@serverError').text.to.equal("Your old password is invalid!");
    }
};
