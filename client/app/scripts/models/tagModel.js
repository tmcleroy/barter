var Tags = require('../collections/tagsCollection');

var TagModel = Backbone.Model.extend({
  collection: Tags,
  urlRoot: '/api/tags'
});

export default TagModel;
