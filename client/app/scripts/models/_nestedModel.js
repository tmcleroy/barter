var NestedModel = Backbone.Model.extend({
  parse: function (response) {
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    _.each(this.nestedDefs, (ModelOrCollection, key) => {
      var raw = response[key];
      if (raw) {
        if (typeof ModelOrCollection === 'function') {
          response[key] = new ModelOrCollection(raw, { parse: true });
        } else {
          console.warn('Invalid Model or Collection: There is likely a circular reference in this model/collection. We will use the raw data.');
          response[key] = raw;
        }
      }
    });
    return response;
  }
});

module.exports = NestedModel;
