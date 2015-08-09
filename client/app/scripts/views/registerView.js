const RegisterView = Backbone.View.extend({
  template: require('templates/register.ejs'),

  events: {
    'click button[type="submit"]': 'submit'
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  },

  submit (evt) {
    evt.preventDefault();

    var $form = $(evt.target).closest('form');
    var username = $form.find( 'input[name="username"]' ).val();
    var password = $form.find( 'input[name="password"]' ).val();
    var email = $form.find( 'input[name="email"]' ).val();

    App.API.register(username, password, email)
      .done((user) => {
        App.API.login(username, password)
          .done(() => {
            App.Router.navigate('app', true);
          })
          .fail((xhr, status, error) => {
            console.error(status + ' ' + error);
          });
      })
      .fail((xhr, status, error) => {
        console.error(status + ' ' + error);
      });
  }

});

export default RegisterView;
