import Notification from 'scripts/models/notificationModel';

var NotificationsCollection = Backbone.Collection.extend({
  model: Notification,

  url: '/api/notifications'
});

export default NotificationsCollection;
