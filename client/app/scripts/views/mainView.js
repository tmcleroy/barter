var MainView = Backbone.View.extend({
  template: require('../../templates/main.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = MainView;
