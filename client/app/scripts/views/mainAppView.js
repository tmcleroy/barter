var MainAppView = Backbone.View.extend({
  template: require('../../templates/mainApp.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = MainAppView;
