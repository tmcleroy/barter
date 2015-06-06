var utils = require('../utils');
var ProfileView = require('./profileView.js');

var HeaderView = Backbone.View.extend({
  template: require('../../templates/header.ejs'),

  events: {
    'click [data-action="login"]': 'loginClicked',
    'click [data-action="logout"]': 'logoutClicked'
  },

  initialize: function (params) {
    this.render();

    this.listenTo(Backbone, 'loggedIn', this.loggedIn);
    this.listenTo(Backbone, 'loggedOut', this.loggedOut);
    this.listenTo(Backbone, 'routeChanged', this.routeChanged);
  },

  render: function () {
    this.$el.html(this.template());
  },

  loginClicked: function (evt) {
    evt.preventDefault();
    App.Router.navigate('login', true);
  },

  logoutClicked: function (evt) {
    App.Router.logout('home');
  },

  loggedIn: function (user) {
    new ProfileView({
      el: this.$('.profileContainer'),
      size: 'small'
    });
    this.$('[data-action="login"]')
      .attr('data-action', 'logout')
      .text('Log out');
  },

  loggedOut: function () {
    this.$('.profileContainer').empty();
    this.$('[data-action="logout"]')
      .attr('data-action', 'login')
      .text('Log in');
  },

  routeChanged: function (route) {
    if (this.$('[data-route="' + route + '"]')) {
      this.$('[data-route]')
        .removeClass('active');
      this.$('[data-route="' + route + '"]')
        .addClass('active');
    }
  }

});

module.exports = HeaderView;
