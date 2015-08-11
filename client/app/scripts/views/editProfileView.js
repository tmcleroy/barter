import template from 'templates/profile/edit.ejs';

const ProfileView = Backbone.View.extend({
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

export default ProfileView;
