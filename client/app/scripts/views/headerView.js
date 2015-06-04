var utils = require('../utils');

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
    this.$('[data-action="login"]')
      .attr('data-action', 'logout')
      .text('Log out');
  },

  loggedOut: function () {
    this.$('[data-action="logout"]')
      .attr('data-action', 'login')
      .text('Log in');
  }

});

module.exports = HeaderView;
