const SettingsView = Backbone.View.extend({
  template: require('templates/settings.ejs'),

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      user: this.model
    }));
  }
});

export default SettingsView;
