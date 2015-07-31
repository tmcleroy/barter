var Submission = require('../models/submissionModel');

var SubmissionsCollection = Backbone.Collection.extend({
  model: Submission,
  url: '/api/submissions'
});

module.exports =  SubmissionsCollection;
