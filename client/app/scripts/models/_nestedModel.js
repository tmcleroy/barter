var NestedModel = Backbone.Model.extend({
  parse: function (response) {
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    console.log(response);
    _.each(this.nestedDefs, (ModelOrCollection, key) => {
      console.log(key);
      var raw = response[key];
      response[key] = new ModelOrCollection(raw, { parse: true });
    });
    return response;
  }
});

module.exports = NestedModel;
