// views
var rootView = require('./views/rootView');
var loginView = require('./views/loginView');
var usersIndexView = require('./views/users/indexView');
var usersShowView = require('./views/users/showView');
var usersCreateView = require('./views/users/createView');

// handlers
var loginHandler = require('./handlers/loginHandler');
var logoutHandler = require('./handlers/logoutHandler');

// middleware
var requireAuth = require('./middleware/requireAuth');


module.exports = function (app, passport) {

  app.all('/api/*',                 requireAuth);

  app.get('/',                      requireAuth, rootView);
  app.get('/login',                              loginView);
  app.post('/login',                             loginHandler);
  app.get('/logout',                             logoutHandler);

  // Users
  app.get('/api/users',                          usersIndexView);
  app.get('/api/users/:id',                      usersShowView);
  app.post('/api/users/:username/:password',     usersCreateView);

};
