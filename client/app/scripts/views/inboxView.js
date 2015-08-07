import Notifications from 'scripts/collections/notificationsCollection';

var InboxView = Backbone.View.extend({
  template: require('templates/inbox.ejs'),

  events: {
    'click [data-action="seen"]': 'seenNotification'
  },

  initialize (params) {
    this.collection = new Notifications();

    this.listenTo(this.collection, 'change sync', this.render);
    this.fetchNotifications();
  },

  fetchNotifications () {
    this.$el.addClass('loading');
    this.collection.fetch({
      data: { where: 'unseen' }
    });
  },

  render () {
    this.$el.html(this.template({
      notifications: this.collection
    }));
    this.$el.removeClass('loading');
  },

  seenNotification (evt) {
    this.collection.findWhere({ id: parseInt($(evt.target).attr('data-id'), 10) }).setState('seen');
  }
});

export default InboxView;
