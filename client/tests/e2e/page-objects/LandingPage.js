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
  url: '/',
  commands: [],

  // A page object can have elements
  elements: {
    appContainer: '#app',
    getStartedBtn: '#getStartedBtn',
    overlay: '.md-overlay.md-fixed.md-dialog-overlay',
    infoContainer: '.landing-info-container'
  }
};
