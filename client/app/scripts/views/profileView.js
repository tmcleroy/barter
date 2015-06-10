var ProfileView = Backbone.View.extend({
  template: require('../../templates/profile/profile.ejs'),

  user: null,

  events: {
  },

  initialize: function (params) {
    if (!App.Env.user) {
      this.remove();
      return;
    } else {
      this.user = App.Env.user;
    }
    this.size = params.size;

    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      size: this.size,
      user: this.user
    }));
  }

});

module.exports = ProfileView;
