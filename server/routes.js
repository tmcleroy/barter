// views
var rootView = require('./views/rootView');
var loginView = require('./views/loginView');
var usersIndexView = require('./views/users/indexView');
var usersShowView = require('./views/users/showView');
var usersCreateView = require('./views/users/createView');

// handlers
var loginHandler = require('./handlers/loginHandler');

module.exports = function (app, passport) {

  app.get('/',            rootView);
  app.get('/login',       loginView);
  app.post('/login',      passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/3'
  }));


  // Users
  app.get('/users',             usersIndexView);
  app.get('/users/:id',         usersShowView);
  app.post('/users/:username',  usersCreateView);

};
