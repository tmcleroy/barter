import User from './models/userModel';

const api = {
  login (username, password) {
    return $.ajax({
      method: 'post',
      url: '/login',
      data: {
        username: username,
        password: password
      }
    }).done((user) => {
      App.user = new User(user);
      Backbone.trigger('loggedIn', user);
    });
  },

  logout (redirRoute) {
    return $.ajax({
      method: 'post',
      url: '/logout'
    }).done((data) => {
      App.user = null;
      Backbone.trigger('loggedOut');
      if (redirRoute) { App.Router.navigate(redirRoute, true); }
    }).fail((xhr, status, error) => {
      console.log(status, error);
    });
  },

  register (username, password, email) {
    return $.ajax({
      method: 'post',
      url: '/register',
      data: {
        username: username,
        password: password,
        email: email
      }
    }).done((user) => {
      Backbone.trigger('registered', user);
    });
  },

  getUnreadNotificationCount () {
    return $.ajax({
      method: 'get',
      url: '/api/notifications',
      data: {
        countOnly: true,
        where: 'unseen'
      }
    });
  }
};

export default api;
