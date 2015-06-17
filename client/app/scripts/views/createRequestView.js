var Request = require('../models/requestModel');

var CreateRequestView = Backbone.View.extend({
  template: require('../../templates/request/createRequest.ejs'),

  model: null,

  events: {
    'click [data-action="submit"]': 'submitClicked'
  },

  initialize: function (params) {
    this.render();

    this.model = new Request();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submitClicked: function (evt) {
    var title = this.$('[data-attr="title"]').val();
    var body = this.$('[data-attr="body"]').val();
    var offer = this.$('[data-attr="offer"]').val();
    this.model.set({
      title: title,
      body: body,
      offer: offer
    });
    this.model.save();
  }

});

module.exports = CreateRequestView;
