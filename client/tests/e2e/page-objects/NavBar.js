module.exports = {
  url: '/home',
  commands: [],

  // A page object can have elements
  elements: {
    container: 'md-drawer.md-app-drawer',
    homeNavItem: '.md-drawer.md-app-drawer > ul > li:nth-child(1)',
    calendarNavItem: '.md-drawer.md-app-drawer > ul > li:nth-child(2)',
    customerNavItem: '.md-drawer.md-app-drawer > ul > li:nth-child(3)',
    companyNavItem: '.md-drawer.md-app-drawer > ul > li:nth-child(4)',
  }
};
