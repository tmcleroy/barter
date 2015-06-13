var ProposalModel = Backbone.Model.extend({
  urlRoot: '/api/proposals'

  // url: function () {
  //   return '/api/proposals/' + this.id;
  // }
});

module.exports = ProposalModel;
