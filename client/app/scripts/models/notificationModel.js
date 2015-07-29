import NestedModel from './_nestedModel';
import Notifications from '../collections/notificationsCollection';
import User from './userModel';
import Comment from './commentModel';
// import Proposal from './proposalModel';
// import Request from './requestModel';
// import Submission from './submissionModel';

var NotificationModel = NestedModel.extend({
  collection: Notifications,

  urlRoot: '/api/notifications/',

  nestedDefs: {
    'User': User,
    'SubjectUser': User,
    'ObjectUser': User,
    'ObjectComment': Comment,
    // 'ObjectProposal': Proposal,
    // 'ObjectRequest': Request,
    // 'ObjectSubmission': Submission
  }
});

export default NotificationModel;
