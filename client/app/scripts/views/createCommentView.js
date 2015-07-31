var Comment = require('../models/commentModel');
var Alert = require('./components/alert');

var CreateCommentView = Backbone.View.extend({
  template: require('../../templates/comment/createComment.ejs'),

  events: {
    'submit .ajaxForm': 'submitClicked'
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
    evt.preventDefault();
    $('body').addClass('loading');
    var body = this.$('[data-attr="body"]').val();
    this.model.set({
      body: body,
      requestId: this.request.get('id')
    });
    this.model.save().done((comment) => {
      this.collection.add(comment);
      this.afterSubmit();
    });
  },

  afterSubmit: function () {
    $('body').removeClass('loading');
    this.model = new Comment();
    this.render();
    new Alert({
      type: 'success',
      body: 'Comment Submitted'
    });
  }

});

module.exports =  CreateCommentView;
