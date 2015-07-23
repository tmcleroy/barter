var PaginatedCollection = Backbone.Collection.extend({
  parse: function (data) {
    var isSorted = _.intersection(_.keys(data), ['total', 'items']).length === 2;
    this.total = data.total || this.length;
    return isSorted ? data.items : data;
  }
});

module.exports = PaginatedCollection;
