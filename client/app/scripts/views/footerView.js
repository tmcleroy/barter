const FooterView = Backbone.View.extend({
  template: require('templates/footer.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

export default FooterView;
