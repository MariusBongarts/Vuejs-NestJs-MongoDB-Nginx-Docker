module.exports = {
  url: '/profile',
  commands: [],

  elements: {
    container: '.password-settings',
    oldPassword: '#oldPassword',
    newPassword: '#newPassword',
    passwordRepeat: '#passwordRepeat',
    passwordSaveBtn: '#passwordSaveBtn',
    passwordRequired: '.missing-password',
    passwordRepeatNotMatch: '.not-match-password',
    serverError: '.md-error.server-error'
  }
};
