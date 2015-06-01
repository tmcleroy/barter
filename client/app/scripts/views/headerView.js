var HeaderView = Backbone.View.extend({
  template: require('../../templates/header.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = HeaderView;
