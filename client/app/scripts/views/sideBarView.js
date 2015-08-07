const SideBarView = Backbone.View.extend({
  template: require('templates/sidebar.ejs'),

  // this is a model even though it only stores one value so that in the future
  // we can update it with socket.io and have this view re-render on change events
  unseenNotifications: new Backbone.Model({ count: 0 }),

  initialize (params) {
    this.render();

    if (App.user) {
      this.updateInboxCount();
    }
    this.listenTo(Backbone, 'routeChanged', this.routeChanged);
    this.listenTo(Backbone, 'change:notifications', this.updateInboxCount);
    this.listenTo(this.unseenNotifications, 'change:count', this.render);
  },

  render () {
    this.$el.html(this.template({
      unseen: this.unseenNotifications.get('count')
    }));
  },

  routeChanged (route) {
    this.$('[data-route]').removeClass('active');
    this.$('[data-route="' + route + '"]').addClass('active');
  },

  updateInboxCount (collection) {
    let count = 0;
    // collection explicitly passed in by event triggerer
    // so we don't have to refetch the unseen notification count
    if (collection) {
      count = collection.where({ state: -1 }).length;
      this.unseenNotifications.set('count', count);
    } else {
      App.API.getUnreadNotificationCount().done((count) => {
        this.unseenNotifications.set('count', count);
      });
    }
  }

});

export default SideBarView;
