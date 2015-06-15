var Backbone = require('backbone');
var _ = require('lodash');

var HeaderView = require('./views/headerView');
var FooterView = require('./views/footerView');
var HomeView = require('./views/homeView');
var AppView = require('./views/appView');
var LoginView = require('./views/loginView');
var RegisterView = require('./views/registerView');
var RequestsView = require('./views/requestsView');
var RequestView = require('./views/requestView');
var CreateRequestView = require('./views/createRequestView');
var User = require('./models/userModel');

var Router = Backbone.Router.extend(_.defaults({
  lastView: null,
  currentView: null,
  view: null,

  routes: {
    '(/)'                         : 'home',
    'home(/)'                     : 'home',

    'login(/)'                    : 'login',
    'register(/)'                 : 'register',
    'app(/)'                      : 'app',

    'app/requests(/)'             : 'requests',
    'app/requests/:id(/)'         : 'request',
    'app/request/new(/)'          : 'createRequest'
  },

  initialize: function () {
    App.user = App.serverVars.user ? new User(App.serverVars.user) : null;

    new HeaderView({
      el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
    });

    new FooterView({
      el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
    });

    this.listenTo(Backbone, 'loggedIn', this.loggedIn);
  },

  // returns boolean whether to continue rendering the new view
  preRoute: function (viewName) {
    this.currentView = viewName;
    if (this.lastView !== this.currentView) {
      $('#appContainer').empty();
      return true;
    } else {
      return false;
    }
  },

  postRoute: function (viewName) {
    this.lastView = this.currentView;
    Backbone.trigger('routeChanged', viewName);
  },

  home: function () {
    var viewName = 'home';

    if (this.preRoute(viewName)) {
      this.view = new HomeView({
        el: $('<div class="homeViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  },

  login: function () {
    var viewName = 'login';

    if (this.preRoute(viewName)) {
      this.view = new LoginView({
        el: $('<div class="loginViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  },

  register: function () {
    var viewName = 'register';

    if (this.preRoute(viewName)) {
      this.view = new RegisterView({
        el: $('<div class="registerViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  },

  app: function () {
    var viewName = 'app';

    if (this.preRoute(viewName)) {
      this.view = new AppView({
        el: $('<div class="appViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  },

  requests: function () {
    var viewName = 'requests';

    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  },

  request: function (id) {
    var viewName = 'request';

    if (this.preRoute(viewName)) {
      this.view = new RequestView({
        el: $('<div class="requestViewContainer" />').appendTo('#appContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  createRequest: function () {
    var viewName = 'createRequest';

    if (this.preRoute(viewName)) {
      this.view = new CreateRequestView({
        el: $('<div class="createRequestViewContainer" />').appendTo('#appContainer')
      });
      this.postRoute(viewName);
    }
  }


},
{ // global helpers

}));

module.exports = Router;
