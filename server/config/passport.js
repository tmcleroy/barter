var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var models = require('../models');

module.exports = function (passport) {
  console.log('IN THE EXPORST THSNAT');

    passport.use(new LocalStrategy(function(username, password, done) {
      console.log('BEFORE NEXT TICK');
      console.log(username);

        models.User.findOne({ username:  username }).then(function(user) {
          console.log('INSIDE FIND ONE');
           // if there are any errors, return the error before anything else
           if (user) {
             console.log('USER');
             console.log(user);
             return done(user);
           } else {
             console.log('ELSE erroe');
           }
         });
       }));
};
