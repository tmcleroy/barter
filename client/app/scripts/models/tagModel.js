var Tags = require('../collections/TagsCollection');

var TagModel = Backbone.Model.extend({
  collection: Tags,
  urlRoot: '/api/tags'
});

module.exports = TagModel;
