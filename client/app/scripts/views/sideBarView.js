var SideBarView = Backbone.View.extend({
  template: require('../../templates/sidebar.ejs'),

  // this is a model even though it only stores one value so that in the future
  // we can update it with socket.io and have this view re-render on change events
  unseenNotifications: new Backbone.Model({ count: 0 }),

  initialize: function (params) {
    this.render();

    App.API.getUnreadNotificationCount().done((count) => {
      this.unseenNotifications.set('count', count);
    });
    this.listenTo(Backbone, 'routeChanged', this.routeChanged);
    this.listenTo(this.unseenNotifications, 'change:count', this.render);
  },

  render: function () {
    this.$el.html(this.template({
      unseen: this.unseenNotifications.get('count')
    }));
  },

  routeChanged: function (route) {
    this.$('[data-route]').removeClass('active');
    this.$('[data-route="' + route + '"]').addClass('active');
  }

});

export default SideBarView;
