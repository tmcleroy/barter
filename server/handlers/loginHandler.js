var passport = require('passport');

var handler = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

module.exports = handler;
