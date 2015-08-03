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
  },

  predicateMap: {
    'Comment': 'commented on'
  },

  getPredicate () {
    return this.predicateMap[this.get('actionType')];
  },

  getObjectUrl () {
    var objectType = this.get('objectType');
    var actionType = this.get('actionType');
    var objectId = this.get(`Object${ objectType }`).get('id');
    var actionId = this.get('actionId');
    var options = encodeURIComponent(`{"goto":"#${ actionType }-${ actionId }"}`);
    return `/app/${ objectType }s/show/${ objectId }/${ options }`.toLowerCase();
  }
});

module.exports = NotificationModel;
