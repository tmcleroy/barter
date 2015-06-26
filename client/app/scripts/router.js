var Backbone = require('backbone');
var _ = require('lodash');

var AppSkeleton = require('../templates/app.ejs');
var HeaderView = require('./views/headerView');
var FooterView = require('./views/footerView');
var SideBarView = require('./views/sideBarView.js');
var HomeView = require('./views/homeView');
var LoginView = require('./views/loginView');
var RegisterView = require('./views/registerView');
var SettingsView = require('./views/settingsView');
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
    'app/settings(/)'             : 'settings',

    'app/requests/browse(/)'      : 'requestsBrowse',
    'app/requests/show/:id(/)'    : 'requestsShow',
    'app/requests/create(/)'      : 'requestsCreate',
    'app/requests/mine(/)'        : 'requestsMine'
  },

  initialize: function () {
    App.user = App.serverVars.user ? new User(App.serverVars.user) : null;
    $('#appContainer').html(AppSkeleton());

    new HeaderView({
      el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
    });

    new FooterView({
      el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
    });

    new SideBarView({
      el: $('<div class="sidebarViewContainer" />').appendTo('#sidebarContainer')
    });

    this.listenTo(Backbone, 'loggedIn', this.loggedIn);
  },

  // returns boolean whether to continue rendering the new view
  preRoute: function (viewName) {
    if (this.view) { this.view.remove(); }
    this.currentView = viewName;
    if (this.lastView !== this.currentView) {
      $('#contentContainer').empty();
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
        el: $('<div class="homeViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  login: function () {
    var viewName = 'login';

    if (this.preRoute(viewName)) {
      this.view = new LoginView({
        el: $('<div class="loginViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  register: function () {
    var viewName = 'register';

    if (this.preRoute(viewName)) {
      this.view = new RegisterView({
        el: $('<div class="registerViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  settings: function () {
    var viewName = 'settings';

    if (this.preRoute(viewName)) {
      this.view = new SettingsView({
        el: $('<div class="settingsViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsBrowse: function () {
    var viewName = 'requestsBrowse';

    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsBrowseContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsShow: function (id) {
    var viewName = 'requestsShow';

    if (this.preRoute(viewName)) {
      this.view = new RequestView({
        el: $('<div class="requestsShowViewContainer" />').appendTo('#contentContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  requestsCreate: function () {
    var viewName = 'requestsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateRequestView({
        el: $('<div class="requestsCreateViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsMine: function () {
    var viewName = 'requestsMine';

    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsMineViewContainer" />').appendTo('#contentContainer'),
        collectionOverrides: { url: '/api/requests/mine' }
      });
      this.postRoute(viewName);
    }
  }


},
{ // global helpers

}));

module.exports = Router;
