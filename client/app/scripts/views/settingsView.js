const SettingsView = Backbone.View.extend({
  template: require('templates/settings.ejs'),

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template({
      user: this.model
    }));
  }
});

export default SettingsView;
