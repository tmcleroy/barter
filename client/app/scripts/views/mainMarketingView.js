var MainMarketingView = Backbone.View.extend({
  template: require('../../templates/mainMarketing.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = MainMarketingView;
