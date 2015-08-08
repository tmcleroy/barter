const HomeView = Backbone.View.extend({
  template: require('templates/home.ejs'),

  events: {
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  }

});

export default HomeView;
