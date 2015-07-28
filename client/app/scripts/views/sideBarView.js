var SideBarView = Backbone.View.extend({
  template: require('../../templates/sidebar.ejs'),

  initialize: function (params) {
    this.render();

    App.API.getUnreadNotificationCount().done((count) => {
      console.log(`${ count } unread notifications`);
    });
    this.listenTo(Backbone, 'routeChanged', this.routeChanged);
  },

  render: function () {
    this.$el.html(this.template());
  },

  routeChanged: function (route) {
    this.$('[data-route]').removeClass('active');
    this.$('[data-route="' + route + '"]').addClass('active');
  }

});

export default SideBarView;
