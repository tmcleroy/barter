var passport = require('passport');

var handler = passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/3'
});

module.exports = handler;
