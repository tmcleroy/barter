var utils = require('../utils');
var ProfileView = require('./profileView.js');

var HeaderView = Backbone.View.extend({
  template: require('../../templates/header.ejs'),

  events: {
    'click [data-logged-in]': 'logInOutClicked'
  },

  initialize: function (params) {
    this.render();

    this.listenTo(Backbone, 'loggedIn loggedOut', this.render);
    this.listenTo(Backbone, 'routeChanged', this.routeChanged);
  },

  render: function () {
    this.$el.html(this.template({ loggedIn: !!App.Env.user }));
    this.renderProfile();
  },

  renderProfile: function () {
    this.$('.profileContainer').empty();
    new ProfileView({
      el: $('<div>').appendTo(this.$('.profileContainer')),
      size: 'small'
    });
  },

  logInOutClicked: function (evt) {
    evt.preventDefault();
    var loggedIn = !!App.Env.user;
    if (loggedIn) {
      App.Router.logout('home');
    } else {
      App.Router.navigate('login', true);
    }
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
