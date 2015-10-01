var utils = require('../utils/utils');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');

// load up the user model
var models = require('../models');

module.exports = function (req, res, next) {
  passport.serializeUser(function (user, done) {
    done(null, user.get('id'));
  });

  passport.deserializeUser(function (id, done) {
    models.User.findById(id).then(function (user) {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(function (username, password, done) {
    models.User.findOne({ where: { username:  username } }).then(function (user) {
       // if there are any errors, return the error before anything else
       if (user) {
         console.log('user found');
         if (utils.auth.passwordAndHashMatch(password, user.dataValues.password)) {
           console.log('valid password, logged in!');
           return done(null, user);
         } else {
           console.log('invalid password');
           return done(null, false);
         }
       }
       if (!user) { // no user found
         console.log('no user found');
         return done(null, false);
       }
     });
  }));

  // TODO don't check this in
  var TWITTER_CONSUMER_KEY = 'kBWIUGMdKdqX6uPFjhedg';
  var TWITTER_CONSUMER_SECRET = 'kQlcYf7m3u2f7DSHSDDoqSBgBQUk6tTJnMA9A40xbY0';
  passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: 'localhost:5000/auth/twitter/callback'
  },
  function (token, tokenSecret, profile, done) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(arguments);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    models.User.findOrCreate({
      where: {
        provider: profile.provider || 'twitter',
        providerToken: token
      }
    }).then(function (user, newlyCreated) {
       if (user) { // user found or created
         console.log('user ' + newlyCreated ? 'created' : 'found');
         return done(null, user);
       } else { // no user found
         console.log('no user found');
         return done(null, false);
       }
     });
  }
));
};
