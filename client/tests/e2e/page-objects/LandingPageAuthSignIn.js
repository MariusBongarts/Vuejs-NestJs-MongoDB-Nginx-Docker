/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */
module.exports = {
  url: '/auth/sign-in',
  commands: [],
  elements: {
    container: '.sign-in-container',
    emailInput: '#emailSignIn',
    errorMsg: '.md-error.server-error',
    overlay: '.md-overlay.md-fixed.md-dialog-overlay',
    passwordInput: '#passwordSignIn',
    signInBtn: 'div.actions > button',
    emailRequired: '.md-error.missing-email',
    emailInvalid: '.md-error.invalid-email',
    passwordRequired: '.md-error.missing-password',
    passwordsNotMatch: '.md-error.not-match-password',
    signUpBtn: '.sign-up-route-btn'
  }
};
