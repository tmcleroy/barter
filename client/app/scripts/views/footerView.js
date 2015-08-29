import template from 'templates/footer.ejs';

const FooterView = Backbone.View.extend({
  template,
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
