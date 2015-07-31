// TODO this line is bad and should be fixed
// var Comments = require('../collections/commentsCollection'); // this is necessary, try loading a request without it
var Proposals = require('../collections/proposalsCollection'); // this is necessary, try loading a request without it

var NestedModel = require('./_nestedModel');
var User = require('./userModel');
var Comment = require('./commentModel');
var Proposal = require('./proposalModel');
var Request = require('./requestModel');
var Submission = require('./submissionModel');

var NotificationModel = NestedModel.extend({
  initialize () {
    console.log('initializing notificationmodel');
  },

  urlRoot: '/api/notifications/',

  nestedDefs: {
    'User': User,
    'SubjectUser': User,
    'ObjectUser': User,
    'ObjectComment': Comment,
    'ObjectProposal': Proposal,
    'ObjectRequest': Request,
    'ObjectSubmission': Submission
  }
});

module.exports =  NotificationModel;
