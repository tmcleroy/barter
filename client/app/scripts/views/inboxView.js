import Notifications from '../collections/notificationsCollection.js';

var InboxView = Backbone.View.extend({
  template: require('../../templates/inbox.ejs'),

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
    console.log(this.collection);
    this.$el.html(this.template({
      notifications: this.collection
    }));
    this.$el.removeClass('loading');
  }
});

export default InboxView;
