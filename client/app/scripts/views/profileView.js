import Backbone from 'backbone';

const ProfileView = Backbone.View.extend({
  template: require('templates/profile/profile.ejs'),

  events: {
  },

  initialize (params) {
    if (!App.user) {
      this.remove();
      return;
    }
    this.size = params.size;

    this.render();
  },

  render () {
    this.$el.html(this.template({
      size: this.size,
      user: App.user.toJSON()
    }));
  }

});

export default ProfileView;
