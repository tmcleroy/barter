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
    'Comment': '<b>commented</b> on',
    'Proposal': 'has a <b>proposal</b> for',
    'Submission': 'made a <b>submission</b> for'
  },

  getPredicate () {
    return this.predicateMap[this.get('actionType')];
  },

  getObjectUrl () {
    var objectType = this.get('objectType');
    var objectId = this.get(`Object${ objectType }`).get('id');
    var actionType = this.get('actionType');
    var actionId = this.get('actionId');
    var options = encodeURIComponent(`{"goto":"#${ actionType }-${ actionId }"}`);
    return `/app/${ objectType }s/show/${ objectId }/${ options }`.toLowerCase();
  }
});

module.exports = NotificationModel;
