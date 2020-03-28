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
  url: '/auth/sign-up',
  commands: [],
  elements: {
    container: '.sign-up-container',
    emailInput: '#emailSignUp',
    passwordInput: '#passwordSignUp',
    passwordRepeatInput: '#passwordRepeatSignUp',
    errorMsg: '.md-error.server-error',
    overlay: '.md-overlay.md-fixed.md-dialog-overlay',
    signUpBtn: 'div.actions > button',
    emailRequired: '.md-error.missing-email',
    emailInvalid: '.md-error.invalid-email',
    passwordRequired: '.md-error.missing-password',
    passwordRepeatNotMatch: '.md-error.not-match-password',
    signInBtn: '.sign-in-route-btn'
  }
};
