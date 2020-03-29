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
  url: '/home',
  commands: [],

  // A page object can have elements
  elements: {
    container: '.dashboard-container',
  }
};
