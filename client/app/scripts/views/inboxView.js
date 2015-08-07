import Notifications from 'scripts/collections/notificationsCollection';

var InboxView = Backbone.View.extend({
  template: require('templates/inbox.ejs'),

  events: {
    'click [data-action="seen"]': 'seenNotification',
    'click [data-action="all-seen"]': 'seenAll'
  },

  initialize (params) {
    this.collection = new Notifications();

    this.listenTo(this.collection, 'change sync', this.collectionChanged);
    this.fetchNotifications();
  },

  fetchNotifications () {
    this.$el.addClass('loading');
    this.collection.fetch({
      data: { where: 'unseen' }
    });
  },

  collectionChanged () {
    this.render();
    Backbone.trigger('change:notifications', this.collection);
  },

  render () {
    this.$el.html(this.template({
      notifications: this.collection
    }));
    this.$el.removeClass('loading');
  },

  seenNotification (evt) {
    this.collection.findWhere({ id: parseInt($(evt.target).attr('data-id'), 10) }).setState('seen');
  },

  seenAll (evt) {
    this.collection.setAllSeen().done(::this.fetchNotifications);
  }
});

export default InboxView;
