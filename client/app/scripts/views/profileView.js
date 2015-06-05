var ProfileView = Backbone.View.extend({
  template: require('../../templates/profile.ejs'),

  user: App.Env.user,

  events: {
  },

  initialize: function (params) {
    this.size = params.size;

    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      size: this.size,
      username: this.user.username
    }));
  }

});

module.exports = ProfileView;
