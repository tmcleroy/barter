var Request = require('../models/requestModel');

var RequestView = Backbone.View.extend({
  template: require('../../templates/requests/request.ejs'),

  model: null,

  events: {
  },

  initialize: function (params) {
    this.model = new Request({ id: params.id });

    this.listenTo(this.model, 'change sync', this.render);
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON() ));
  }

});

module.exports = RequestView;
