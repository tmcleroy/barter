var HomeView = Backbone.View.extend({
  template: require('../../templates/home.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

export default HomeView;
