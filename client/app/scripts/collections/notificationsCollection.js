import PaginatedCollection from './_paginatedCollection';
import Notification from 'scripts/models/notificationModel';

const NotificationsCollection = PaginatedCollection.extend({
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
  },

  fetchAdditional (options) {
    return $.ajax({
      url: this.url,
      method: 'GET',
      data: options
    });
  }
});

export default NotificationsCollection;
