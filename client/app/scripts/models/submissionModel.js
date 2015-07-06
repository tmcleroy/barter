var Submissions = require('../collections/SubmissionsCollection');
var marked = require('marked');

var SubmissionsModel = Backbone.Model.extend({
  collection: Submissions,

  urlRoot: '/api/submissions',

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
});

module.exports = SubmissionsModel;
