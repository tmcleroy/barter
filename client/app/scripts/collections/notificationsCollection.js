var Notification = require('../models/notificationModel');

var NotificationsCollection = Backbone.Collection.extend({
  model: Notification,

  url: '/api/notifications'
});

module.exports = NotificationsCollection;
