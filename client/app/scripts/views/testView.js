var RequestsView = require('./requestsView');

var TestView = Backbone.View.extend({
  template: require('../../templates/test.ejs'),

  views: {
    'requests': RequestsView
  },

  events: {
  },

  initialize: function (params) {
    this.view = params.view;
    this.render();

    new this.views[this.view]({
      el: $('<div>').appendTo(this.$el)
    });
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = TestView;
