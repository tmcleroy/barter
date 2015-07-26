var User = require('./userModel');
var Request = require('./requestModel');
var Proposal = require('./proposalModel');
var Comments = require('../collections/commentsCollection');

var ModelHydrator = {
  nestedDefs: {
    'User': User,
    'Comments': Comments,
    'Proposal': Proposal,
    'Request': Request
  },

  hydrateModels: function (model) {
    _.each(model.attributes, (val, key) => {
      if (model.nestedDefs[key] && !(val instanceof Backbone.Model) && !(val instanceof Backbone.Collection)) {
        model.set(key, new ModelHydrator.nestedDefs[key](val, { parse: true }));
      }
    });
  }
};

export default ModelHydrator;
