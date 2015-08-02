var NestedModel = require('./_nestedModel');

var NotificationModel = NestedModel.extend({
  urlRoot: '/api/notifications/',

  nestedDefs: {
    'User': 'User',
    'SubjectUser': 'User',
    'ObjectUser': 'User',
    'ObjectComment': 'Comment',
    'ObjectProposal': 'Proposal',
    'ObjectRequest': 'Request',
    'ObjectSubmission': 'Submission'
  }
});

module.exports = NotificationModel;
