var Tag = require('../models/tagModel');

var TagsCollection = Backbone.Collection.extend({
  model: Tag,
  url: '/api/tags'
});

module.exports = TagsCollection;
