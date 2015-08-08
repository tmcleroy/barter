import ProfileView from 'scripts/views/profileView';

const HeaderView = Backbone.View.extend({
  template: require('templates/header.ejs'),

  events: {
    'click [data-logged-in]': 'logInOutClicked',
    'click [data-action="register"]': 'registerClicked'
  },

  initialize (params) {
    this.render();

    this.listenTo(Backbone, 'loggedIn loggedOut', this.render);
  },

  render () {
    this.$el.html(this.template({ loggedIn: !!App.user }));
    this.renderProfile();
  },

  renderProfile () {
    this.$('.profileContainer').empty();
    new ProfileView({
      el: $('<div>').appendTo(this.$('.profileContainer')),
      size: 'small'
    });
  },

  logInOutClicked (evt) {
    evt.preventDefault();
    var loggedIn = !!App.user;
    if (loggedIn) {
      App.API.logout('home');
    } else {
      App.Router.navigate('login', true);
    }
  },

  registerClicked (evt) {
    App.Router.navigate('register', true);
  }
});

export default HeaderView;
