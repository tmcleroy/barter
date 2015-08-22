var passport = require('passport');
// views
var rootView = require('./views/rootView');
// controllers
var userController = require('./controllers/userController');
var requestController = require('./controllers/requestController');
var commentController = require('./controllers/commentController');
var proposalController = require('./controllers/proposalController');
var submissionController = require('./controllers/submissionController');
var notificationController = require('./controllers/notificationController');
// handlers
var loginHandler = require('./handlers/loginHandler');
var logoutHandler = require('./handlers/logoutHandler');
var registerHandler = require('./handlers/registerHandler');
var avatarUploadHandler = require('./handlers/avatarUploadHandler');

// middleware
var requireAuth = require('./middleware/requireAuth');
var requireAdminPermission = require('./middleware/requireAdminPermission');
// var requireApiPermission = require('./middleware/requireApiPermission');
var requireIdMatch = require('./middleware/requireIdMatch');

var routes = function (app) {

  app.all('/api/*', requireAuth/*, requireApiPermission*/);
  app.all(/^[/]app(?=$|[/])/, requireAuth, rootView);

  app.post('/login', passport.authenticate('local'), loginHandler);
  app.post('/register', registerHandler);
  app.post('/logout', logoutHandler);
  app.post('/avatar', requireAuth, avatarUploadHandler);

  // API
  // User
  app.get('/api/users', requireAdminPermission, userController.index);
  app.get('/api/users/:id', requireIdMatch, userController.show);
  app.get('/api/users/:id/subscriptions', userController.subscriptions.get);
  app.post('/api/users/:id/subscriptions', userController.subscriptions.set);

  // Request
  app.get('/api/requests', requestController.index);
  app.get('/api/requests/:id', requestController.show);
  app.post('/api/requests', requestController.create);

  // Comment
  app.post('/api/comments', commentController.create);

  // Proposal
  app.get('/api/proposals', proposalController.index);
  app.post('/api/proposals', proposalController.create);
  app.put('/api/proposals/:id', requireAdminPermission, proposalController.update);
  app.post('/api/proposals/:id/state', proposalController.setState);

  // Notification
  app.get('/api/notifications', notificationController.index);
  app.post('/api/notifications/:id/state', notificationController.setState);
  app.post('/api/notifications/allStates', notificationController.setAllState);

  // Submission
  app.get('/api/submissions/:id', submissionController.show);
  app.post('/api/submissions', submissionController.create);
  app.post('/api/submissions/:id/state', submissionController.setState);

  // catch everything except the explicitly defined routes above
  // this must be the last route in the file
  // serve rootView for all unspecified routes
  // so the single page app can handle the routing from there
  app.get('*', rootView);

};

module.exports = routes;
