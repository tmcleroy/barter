import template from 'templates/login.ejs';

const LoginView = Backbone.View.extend({
  template,

  events: {
    'click button[type="submit"]': 'submit'
  },

  initialize (params) {
    this.render();
    // temporary demo code
    if (params.options && params.options.demo === 'john') {
      this.login('JohnCarmack', 'id');
    }
    if (params.options && params.options.demo === 'richard') {
      this.login('richard_stallman', 'free');
    }
  },

  render () {
    this.$el.html(this.template());
  },

  submit (evt) {
    evt.preventDefault();

    const $form = $(evt.target).closest('form');
    const username = $form.find('input[name="username"]').val();
    const password = $form.find('input[name="password"]').val();
    this.login(username, password);
  },

  login (username, password) {
    App.API.login(username, password)
      .done((user) => {
        App.Router.navigate('app/requests/browse', true);
      })
      .fail((xhr, status, error) => {
        console.error(status, error);
      });
  }

});

export default LoginView;
