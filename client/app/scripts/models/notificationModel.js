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
    var url = '';
    var objectType = this.get('objectType');
    var objectId = this.get(`Object${ objectType }`).get('id');
    var actionType = this.get('actionType');
    var actionId = this.get('actionId');
    var options = encodeURIComponent(`{"goto":"#${ actionType }-${ actionId }"}`);

    // submission on a request, link directly to the submission
    if (objectType === 'Request' && actionType === 'Submission') {
      url = `/app/${ actionType }s/show/${ actionId }`;
    }
    // comment or proposal on a request, link directly to the request itself and
    // highlight the comment or proposal
    else {
      url = `/app/${ objectType }s/show/${ objectId }/${ options }`;
    }
    return url.toLowerCase();
  }
});

module.exports = NotificationModel;
