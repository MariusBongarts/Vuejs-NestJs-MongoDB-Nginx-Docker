const commands = {
  navigateToProfile() {
    return this
      .navigate(this.url)
      .waitForElementVisible('@container')
      .click('@avatar')
      .click('@profileBtn');
  },
  logout() {
    return this
      .navigate(this.url)
      .waitForElementVisible('@container')
      .click('@avatar')
      .click('@logoutBtn');
  },
};

module.exports = {
  url: '/home',
  commands: [commands],

  // A page object can have elements
  elements: {
    container: '.md-toolbar.md-app-toolbar',
    avatar: '.menu-btn.toolbar-btn',
    logoutBtn: '.logout-btn',
    profileBtn: '.profile',
    emailCaption: '.account-info md-caption'
  }
};
