const FooterView = Backbone.View.extend({
  template: require('templates/footer.ejs'),

  events: {
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  }

});

export default FooterView;
