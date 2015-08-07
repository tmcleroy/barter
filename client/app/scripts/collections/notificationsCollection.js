import Notification from 'scripts/models/notificationModel';

const NotificationsCollection = Backbone.Collection.extend({
  model: Notification,

  url: '/api/notifications',

  setAllSeen () {
    return $.ajax({
      url: `${ this.url }/allStates`,
      method: 'POST',
      data: {
        state: 1
      }
    });
  }
});

export default NotificationsCollection;
