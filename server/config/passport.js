var utils = require('../utils');
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var models = require('../models');

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
      done(null, user.get('id'));
    });

    passport.deserializeUser(function(id, done) {
      models.User.findById(id).then(function(user) {
        done(null, user);
      });
    });

    passport.use(new LocalStrategy(function(username, password, done) {
      models.User.findOne({ where: { username:  username } }).then(function(user) {
         // if there are any errors, return the error before anything else
         if (user) {
           console.log('user found');
           if (utils.auth.passwordAndHashMatch(password, user.get('password'))) {
             console.log('valid password, logged in!');
             return done(null, user);
           } else {
             console.log('invalide password');
             return done(null, false);
           }
         }
         if (!user) { // no user found
           console.log('no user found');
           return done(null, false);
         }
       });
    }));
};
