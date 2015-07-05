var Submissions = require('../collections/SubmissionsCollection');
var marked = require('marked');

var SubmissionsModel = Backbone.Model.extend({
  collection: Submissions,

  urlRoot: '/api/submissions',

  getBodyFormatted: function () {
    return marked(this.get('body'));
  }
});

module.exports = SubmissionsModel;
