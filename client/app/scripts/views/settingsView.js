import template from 'templates/settings.ejs';

const SettingsView = Backbone.View.extend({
  template,
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
