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
    'Submission': 'made a <b>submission</b> for',
    'accept': 'accepted',
    'reject': 'rejected'
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


    if (objectType === 'Request') { // comment, proposal, or submission on a request
      if (actionType === 'Submission') { // submission on a request
        url = `/app/${ actionType }s/show/${ actionId }`; // link directly to the submission
      } else { // comment or proposal on a request
        url = `/app/${ objectType }s/show/${ objectId }/${ options }`; // link directly to the request itself and highlight the comment or proposal
      }
    } else if (objectType === 'Proposal') { // proposal accepted or rejected
      if (actionType === 'accept') {
        url = `/app/submissions/create/${ this.get('ObjectRequestId') }`; // link to create the submission
      } else {
        url = `/app/requests/show/${ this.get('ObjectRequestId') }`; // link to the request for which you got rejected
      }
    }

    return url.toLowerCase();
  }
});

module.exports = NotificationModel;
