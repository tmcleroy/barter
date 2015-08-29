import template from 'templates/register.ejs';

const RegisterView = Backbone.View.extend({
  template,
  events: {
    'submit .ajaxForm': 'submit'
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  },

  submit (evt) {
    evt.preventDefault();
    this.$el.addClass('loading');

    const $form = $(evt.target).closest('form');
    const username = $form.find( 'input[name="username"]' ).val();
    const password = $form.find( 'input[name="password"]' ).val();
    const email = $form.find( 'input[name="email"]' ).val();

    App.API.register(username, password, email)
      .done((user) => {
        App.API.login(username, password)
          .done(() => {
            App.Router.navigate('app/profile', true);
          })
          .fail((xhr, status, error) => {
            console.error(status, error);
          });
      })
      .fail((xhr, status, error) => {
        console.error(status, error);
      });
  }

});

export default RegisterView;
