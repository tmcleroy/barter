var User = require('../models/userModel.js');

var LoginView = Backbone.View.extend({
  template: require('../../templates/login.ejs'),

  events: {
    'click button[type="submit"]': 'submit'
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
    var username = $form.find('input[name="username"]').val();
    var password = $form.find('input[name="password"]').val();

    var req = App.API.login(username, password);
    console.log(req);
    req
      .done((user) => {
        App.Router.navigate('app', true);
      })
      .fail((xhr, status, error) => {
        console.log(status + ' ' + error);
      });
  }

});

module.exports = LoginView;
