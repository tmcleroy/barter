// views
var rootView = require('./views/rootView');
var usersIndexView = require('./views/users/indexView');
var usersShowView = require('./views/users/showView');
var usersCreateView = require('./views/users/createView');

// handlers
var loginHandler = require('./handlers/loginHandler');
var logoutHandler = require('./handlers/logoutHandler');

// middleware
var requireAuth = require('./middleware/requireAuth');
var requireApiPermission = require('./middleware/requireApiPermission');


module.exports = function (app, passport) {

  app.all('/api/*', requireAuth, requireApiPermission);
  app.all(/^[/]app(?=$|[/])/, requireAuth, rootView);


  app.post('/login', passport.authenticate('local'), loginHandler);
  app.post('/logout', logoutHandler);

  // API

  // Users
  app.get('/api/users', usersIndexView);
  app.get('/api/users/:id', usersShowView);
  app.post('/api/users/:username/:password', usersCreateView);

  // catch everything except the explicitly defined routes above
  // this must be the last route in the file
  app.get('*', rootView);

};
