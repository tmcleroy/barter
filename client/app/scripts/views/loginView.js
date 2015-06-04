var LoginView = Backbone.View.extend({
  template: require('../../templates/login.ejs'),

  events: {
    'click input[type="submit"]': 'submit'
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submit: function (evt) {
    evt.preventDefault();

    var $form = $(evt.target).closest('form');
    var username = $form.find( 'input[name="username"]' ).val();
    var password = $form.find( 'input[name="password"]' ).val();

    $.post('/login', {
      username: username,
      password: password
    }).done(function (data) {
      Backbone.trigger('loggedIn', data);
      App.Router.navigate('home', true);
    }).fail(function (xhr, status, error) {
      console.log(status + ' ' + error);
    });
  }

});

module.exports = LoginView;
