// views
var rootView = require('./views/rootView');
var appView = require('./views/appView');
var loginView = require('./views/loginView');
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
  app.all('/app/*', requireAuth);

  app.get('/', rootView);
  // app.get('/login',  loginView);

  app.post('/login', passport.authenticate('local'), loginHandler);
  app.post('/logout', logoutHandler);

  app.get('/app', appView);

  // API

  // Users
  app.get('/api/users', usersIndexView);
  app.get('/api/users/:id', usersShowView);
  app.post('/api/users/:username/:password', usersCreateView);

};
