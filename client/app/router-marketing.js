  var Backbone = require('backbone');
  var _ = require('lodash');

  var HeaderView = require('./scripts/views/headerView');
  var FooterView = require('./scripts/views/footerView');
  var MainMarketingView = require('./scripts/views/mainMarketingView');
  var LoginView = require('./scripts/views/loginView');



  var MarketingRouter = Backbone.Router.extend({
    lastView: null,
    currentView: null,
    view: null,

    routes: {
      '(/)'                         : 'home',
      'home(/)'                     : 'home',
      'login(/)'                    : 'login',
      'logout(/)'                   : 'logout'
    },

    initialize: function () {
      new HeaderView({
        el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
      });

      new FooterView({
        el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
      });
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
    },

    home: function () {
      var viewName = 'home';

      if (this.preRoute(viewName)) {
        this.view = new MainMarketingView({
          el: $('<div class="mainMarketingViewContainer" />').appendTo('#appContainer')
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

    // logout: function () {
    //   var viewName = 'logout';
    //
    //   if (this.currentView !== viewName) {
    //   }
    // }
  });

  module.exports = MarketingRouter;
