import Submission from 'scripts/models/submissionModel';

const SubmissionsCollection = Backbone.Collection.extend({
  model: Submission,
  url: '/api/submissions'
});

export default SubmissionsCollection;
