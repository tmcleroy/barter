var Tag = require('../models/tagModel');

var TagsCollection = Backbone.Collection.extend({
  model: Tag,
  url: '/api/tags',
  add: function (tag) {
    var isDupe = this.any(t => t.get('name') === tag.get('name'));
    return isDupe ? false : Backbone.Collection.prototype.add.call(this, tag);
  }
});

module.exports = TagsCollection;
