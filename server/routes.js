const passport = require('passport');
// views
const rootView = require('./views/rootView');
// controllers
const userController = require('./controllers/userController');
const requestController = require('./controllers/requestController');
const commentController = require('./controllers/commentController');
const proposalController = require('./controllers/proposalController');
const submissionController = require('./controllers/submissionController');
const notificationController = require('./controllers/notificationController');
// handlers
const loginHandler = require('./handlers/loginHandler');
const logoutHandler = require('./handlers/logoutHandler');
const registerHandler = require('./handlers/registerHandler');
const avatarUploadHandler = require('./handlers/avatarUploadHandler');
// middleware
const requireAuth = require('./middleware/requireAuth');
const requireAdminPermission = require('./middleware/requireAdminPermission');
// const requireApiPermission = require('./middleware/requireApiPermission');
const requireIdMatch = require('./middleware/requireIdMatch');

const routes = (app) => {

  // requests to the api require the user to be authenticated
  app.all('/api/*', requireAuth/*, requireApiPermission*/);
  // requests to /app/* require authentication,
  // when authentication passes, the rootView is rendered so the client app can handle routing
  app.all(/^[/]app(?=$|[/])/, requireAuth, rootView);

  // native auth
  app.post('/login', passport.authenticate('local'), loginHandler);
  app.post('/register', registerHandler);
  app.post('/logout', logoutHandler);
  app.post('/avatar', requireAuth, avatarUploadHandler);

  // twiter auth
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // BEGIN API
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
  // END API

  // this must be the last route in the file.
  // catch everything except the explicitly defined routes above
  // serve rootView for all unspecified routes
  // rootView serves the html that loads the client app (see server/templates/index.html.ejs)
  // the client app then handles the routing
  app.get('*', rootView);
};

module.exports = routes;
