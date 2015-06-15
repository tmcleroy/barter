let User = require('./models/userModel');

let api = {
  login: function (username, password) {
    return $.post('/login', {
      username: username,
      password: password
    }).done((user) => {
      App.user = new User(user);
      Backbone.trigger('loggedIn', user);
    });
  },

  logout: function (redirRoute) {
    return $.post('/logout').done((data) => {
      App.user = null;
      Backbone.trigger('loggedOut');
      if (redirRoute) { App.Router.navigate(redirRoute, true); }
    }).fail((xhr, status, error) => {
      console.log(status + ' ' + error);
    });
  },

  register: function (username, password, email) {
    return $.post('/register', {
      username: username,
      password: password,
      email: email
    }).done((user) => {
      Backbone.trigger('registered', user);
    });
  }
};

module.exports = api;
