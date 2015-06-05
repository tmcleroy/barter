var AppView = Backbone.View.extend({
  template: require('../../templates/app.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = AppView;
