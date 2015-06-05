var DashBoardView = Backbone.View.extend({
  template: require('../../templates/dashboard.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = DashBoardView;
