var rootView = require('./views/rootView');
var loginView = require('./views/loginView');

module.exports = function (app) {

  app.get('/',      rootView);
  app.get('/login', loginView);

};
