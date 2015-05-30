var rootView = require('./views/rootView');
var loginView = require('./views/loginView');
var usersIndexView = require('./views/users/indexView');
var usersShowView = require('./views/users/showView');
var usersCreateView = require('./views/users/createView');

module.exports = function (app) {

  app.get('/',            rootView);
  app.get('/login',       loginView);

  // Users
  app.get('/users',             usersIndexView);
  app.get('/users/:id',         usersShowView);
  app.post('/users/:username',  usersCreateView);

};
