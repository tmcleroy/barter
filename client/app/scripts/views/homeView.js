import template from 'templates/home.ejs';

const HomeView = Backbone.View.extend({
  template,
  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  }

});

export default HomeView;
