import template from 'templates/profile/profile.ejs';

const ProfileView = Backbone.View.extend({
  template,
  initialize (params) {
    if (!App.user) {
      this.remove();
      return;
    }
    this.size = params.size;
    this.render();
  },

  render () {
    console.log(App.user);
    this.$el.html(this.template({
      size: this.size,
      user: App.user
    }));
  }

});

export default ProfileView;
