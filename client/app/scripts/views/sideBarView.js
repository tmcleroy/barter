var SideBarView = Backbone.View.extend({
  template: require('../../templates/sidebar.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = SideBarView;
