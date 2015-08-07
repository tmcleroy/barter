var NestedModel = Backbone.Model.extend({
  parse: function (response) {
    // allows for nested Backbone models
    // concept adapted = require(http://stackoverflow.com/a/9904874
    _.each(this.nestedDefs, (ModelOrCollectionKey, prop) => {
      var raw = response[prop];
      if (raw && !(raw instanceof Backbone.Model) && !(raw instanceof Backbone.Collection)) {
        response[prop] = new App.modelsAndCollections[ModelOrCollectionKey](raw, { parse: true });
      }
    });
    return response;
  }
});

export default NestedModel;
