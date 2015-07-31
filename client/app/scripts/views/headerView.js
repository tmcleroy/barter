var ProfileView = require('./profileView.js');

var HeaderView = Backbone.View.extend({
  template: require('../../templates/header.ejs'),

  events: {
    'click [data-logged-in]': 'logInOutClicked',
    'click [data-action="register"]': 'registerClicked'
  },

  initialize: function (params) {
    this.render();

    this.listenTo(Backbone, 'loggedIn loggedOut', this.render);
  },

  render: function () {
    this.$el.html(this.template({ loggedIn: !!App.user }));
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
    var loggedIn = !!App.user;
    if (loggedIn) {
      App.API.logout('home');
    } else {
      App.Router.navigate('login', true);
    }
  },

  registerClicked: function (evt) {
    App.Router.navigate('register', true);
  }
});

module.exports =  HeaderView;
