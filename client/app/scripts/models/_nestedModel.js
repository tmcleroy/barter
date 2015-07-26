var NestedModel = Backbone.Model.extend({
  parse: function (response) {
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    _.each(this.nestedDefs, (ModelOrCollection, key) => {
      var raw = response[key];
      if (raw && !(raw instanceof Backbone.Model) && !(raw instanceof Backbone.Collection)) {
        if (typeof ModelOrCollection === 'function') {
          response[key] = new ModelOrCollection(raw, { parse: true });
        } else {
          console.warn('Invalid Model or Collection: There is likely a circular reference in this model/collection. We will use the raw data. Call ModelHydrator.hydrateModels to turn the raw data into models/collections until a better solution is implemented.');
          response[key] = raw;
        }
      }
    });
    return response;
  }
});

export default NestedModel;
