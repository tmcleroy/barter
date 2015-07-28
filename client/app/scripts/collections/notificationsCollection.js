import Notification from '../models/notificationModel';

var NotificationsCollection = Backbone.Collection.extend({
  model: Notification,

  url: '/api/notifications'
});

export default NotificationsCollection;
