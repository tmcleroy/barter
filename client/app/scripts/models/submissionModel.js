var Submissions = require('../collections/SubmissionsCollection');

var SubmissionsModel = Backbone.Model.extend({
  collection: Submissions,

  urlRoot: '/api/submissions'
});

module.exports = SubmissionsModel;
