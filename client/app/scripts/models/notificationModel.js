import NestedModel from 'scripts/models/_nestedModel';
import StatefulHelper from 'scripts/models/_statefulHelper';

const NotificationModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  urlRoot: '/api/notifications',

  nestedDefs: {
    'User': 'User',
    'SubjectUser': 'User',
    'ObjectUser': 'User',
    'ObjectComment': 'Comment',
    'ObjectProposal': 'Proposal',
    'ObjectRequest': 'Request',
    'ObjectSubmission': 'Submission',
    'ObjectTag': 'Tag'
  },

  predicateMap: {
    'Comment': '<b>commented</b> on',
    'Proposal': 'has a <b>proposal</b> for',
    'Submission': 'made a <b>submission</b> for',
    'accept': '<b>accepted</b>',
    'reject': '<b>rejected</b>',
    'request-with-tag': '<b>tagged a request</b> with'
  },

  getPredicate () {
    return this.predicateMap[this.get('actionType')];
  },

  getObjectUrl () {
    let url = '';
    const objectType = this.get('objectType');
    const objectId = this.get(`Object${ objectType }`).get('id');
    const actionType = this.get('actionType');
    const actionId = this.get('actionId');
    const options = encodeURIComponent(`{"goto":"#${ actionType }-${ actionId }"}`);


    // comment, proposal, or submission on a request
    if (objectType === 'Request') {
      if (actionType === 'Submission') { // submission on a request
        url = `/app/submissions/show/${ actionId }`; // link directly to the submission
      } else { // comment or proposal on a request
        url = `/app/requests/show/${ this.get('ObjectRequestId') }/${ options }`; // link directly to the request, and highlight the comment or proposal
      }
    }
    // proposal accepted or rejected
    else if (objectType === 'Proposal') {
      if (actionType === 'accept') {
        url = `/app/submissions/create/${ this.get('ObjectRequestId') }`; // link to create the submission
      } else {
        url = `/app/requests/show/${ this.get('ObjectRequestId') }`; // link to the request for which you got rejected
      }
    }
    // submission accepted or rejected
    else if (objectType === 'Submission') {
      url = `/app/submissions/show/${ this.get('ObjectSubmissionId') }`; // link to the submission
    }
    // request created with tag that is subscribed to by a user
    else if (objectType === 'Tag') {
      url = `/app/requests/show/${ actionId }`; // link directly to the request
    }

    return url.toLowerCase();
  }
}));

export default NotificationModel;
