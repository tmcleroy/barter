import template from 'templates/welcome.ejs';

const WelcomeView = Backbone.View.extend({
  template,

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  }
});

export default WelcomeView;
