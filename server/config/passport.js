require('dotenv').load(); // environment variables in .env
var utils = require('../utils/utils');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');

// load up the user model
var models = require('../models');

module.exports = function (req, res, next) {
  passport.serializeUser(function (user, done) {
    // user.id for native
    // user[0].dataValues.id for twitter auth (i have no idea why)
    done(null, user.id || user[0].dataValues.id);
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

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    // using 127.0.0.1 because twitter won't let you use localhost
    callbackURL: 'http://127.0.0.1:5000/auth/twitter/callback'
  },
  function (token, tokenSecret, profile, done) {
    models.User.findOrCreate({
      where: {
        provider: profile.provider || 'twitter',
        providerToken: token
      },
      defaults: {
        username: profile.username,
        avatar: profile._json.profile_image_url_https
      }
    }).then(function (user, newlyCreated) {
       if (user) { // user found or created
         console.log('user ' + (newlyCreated ? 'created' : 'found'));
         return done(null, user);
       } else { // no user found
         console.log('no user found');
         return done(null, false);
       }
     });
  }));
};
