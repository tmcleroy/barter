import NestedModel from './_nestedModel';
import Notifications from '../collections/notificationsCollection';
import User from './userModel';

var NotificationModel = NestedModel.extend({
  collection: Notifications,

  urlRoot: '/api/notifications/',

  nestedDefs: {
    'User': User,
    'SubjectUser': User
  }
});

export default NotificationModel;
