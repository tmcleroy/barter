var Submission = require('../models/submissionModel');

var SubmissionsCollection = Backbone.Collection.extend({
  model: Submission,
  url: '/api/submissions'
});

export default SubmissionsCollection;
