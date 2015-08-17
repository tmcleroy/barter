import template from 'templates/profile/editProfile.ejs';

const EditProfileView = Backbone.View.extend({
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

export default EditProfileView;
