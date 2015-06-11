var ProfileView = Backbone.View.extend({
  template: require('../../templates/profile/profile.ejs'),

  events: {
  },

  initialize: function (params) {
    if (!App.user) {
      this.remove();
      return;
    }
    this.size = params.size;

    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      size: this.size,
      user: App.user.toJSON()
    }));
  }

});

module.exports = ProfileView;
