var ProfileView = Backbone.View.extend({
  template: require('../../templates/profile.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = ProfileView;
