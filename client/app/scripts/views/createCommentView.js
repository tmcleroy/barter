var Comment = require('../models/commentModel');

var CreateCommentView = Backbone.View.extend({
  template: require('../../templates/comment/createComment.ejs'),

  events: {
    'click [data-action="submit"]': 'submitClicked'
  },

  initialize: function (params) {
    this.request = params.request;
    this.render();

    this.model = new Comment();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submitClicked: function (evt) {
    var body = this.$('[data-attr="body"]').val();
    this.model.set({
      body: body,
      requestId: this.request.get('id')
    });
    this.model.save().done((comment) => {
      this.collection.add(comment);
    });

  }

});

module.exports = CreateCommentView;
