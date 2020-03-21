import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';
// //////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
// //////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'it should render landing page': async (browser: NightwatchBrowser) => {
    const homepage = browser.page.homepage() as EnhancedPageObject;
    homepage.waitForElementVisible('@appContainer');
    homepage.waitForElementVisible('@loginBtn');

    // const { app } = homepage.section;
    // app.assert.elementCount('@logo', 1);
    // app.expect.section('@welcome').to.be.visible;
    // app.expect.section('@headline').text.to.match(/^Welcome to Your Vue\.js (.*)App$/);

  },

};
