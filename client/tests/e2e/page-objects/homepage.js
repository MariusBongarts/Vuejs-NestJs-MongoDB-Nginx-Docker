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
    loginBtn: '#app > div > div > button',
    overlay: '.md-overlay.md-fixed.md-dialog-overlay',
    emailInput: '#email',
    passwordInput: '#password',
    signInBtn: 'div.actions > button',
    sideDrawer: '.md-app-side-drawer',
    errorMsg: '.md-error'
  },

  // Or a page objects can also have sections
  sections: {
    app: {
      selector: '#app',

      elements: {
        logo: 'img',
      },

      // - a page object section can also have sub-sections
      // - elements or sub-sections located here are retrieved using the "app" section as the base
      sections: {
        mdError: {
          selector: '.md-error',
        },

        welcome: {
          // the equivalent css selector for the "welcome" sub-section would be:
          //  '#app div.hello'
          selector: 'div.hello',

          elements: {
            cliPluginLinks: {
              selector: 'ul',
              index: 0,
            },
          },
        },
      },
    },
  },
};
