var ProposalsCollection = require('../collections/proposalsCollection');

var ProposalsView = Backbone.View.extend({
  template: require('../../templates/proposal/proposals.ejs'),

  initialize: function (params) {
    this.collection = new ProposalsCollection();
    _.each(params.collectionOverrides, (val, key) => {
      this.collection[key] = val;
    });

    this.listenTo(this.collection, 'change sync', this.render);

    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      proposals: this.collection
    }));
  }

});

module.exports = ProposalsView;
