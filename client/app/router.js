  var Backbone = require('backbone');
  var _ = require('lodash');

  var HeaderView = require('./scripts/views/headerView');
  var FooterView = require('./scripts/views/footerView');
  var HomeView = require('./scripts/views/homeView');
  var AppView = require('./scripts/views/appView');
  var LoginView = require('./scripts/views/loginView');

  var Router = Backbone.Router.extend(_.defaults({
    lastView: null,
    currentView: null,
    view: null,

    routes: {
      '(/)'                         : 'home',
      'home(/)'                     : 'home',

      'login(/)'                    : 'login',
      'app(/)'                      : 'app'
    },

    initialize: function () {
      new HeaderView({
        el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
      });

      new FooterView({
        el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
      });

      this.listenTo(Backbone, 'loggedIn', this.loggedIn);

      if (App.Env.user) {
        Backbone.trigger('loggedIn', App.Env.user);
      }
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

    app: function () {
      var viewName = 'app';

      if (this.preRoute(viewName)) {
        this.view = new AppView({
          el: $('<div class="appViewContainer" />').appendTo('#appContainer')
        });
        this.postRoute(viewName);
      }
    },

  }, { // global helpers

    loggedIn: function (user) {
      App.Env.user = user;
    },

    logout: function (redirRoute) {
      return $.post('/logout').done(function (data) {
        Backbone.trigger('loggedOut');
        if (redirRoute) { App.Router.navigate(redirRoute, true); }
      }).fail(function (xhr, status, error) {
        console.log(status + ' ' + error);
      });
    }
  }));

  module.exports = Router;
