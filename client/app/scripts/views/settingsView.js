var SettingsView = Backbone.View.extend({
  template: require('../../templates/settings.ejs'),

  events: {
    'submit form.avatarForm': 'submit'
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submit: function (evt) {
    // evt.preventDefault();
    //
    // var form = $(evt.target).closest('form').ajaxSubmit();
    // var req = form.data('jqxhr');
    // req.done((data) => {
    //   console.log('done');
    //   console.log(data);
    // });

    // $.ajax({
    //   url: '/avatar',
    //   method: 'POST',
    //   data: $form.serialize()
    // }).done((data) => {
    //   console.log('done');
    //   console.log(data);
    // }).fail((xhr, status, error) => {
    //   console.log('fail');
    // });
  }

});

module.exports = SettingsView;
