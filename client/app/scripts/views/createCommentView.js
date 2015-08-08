import Comment from 'scripts/models/commentModel';
import Alert from './components/alert';

const CreateCommentView = Backbone.View.extend({
  template: require('templates/comment/createComment.ejs'),

  events: {
    'submit .ajaxForm': 'submitClicked'
  },

  initialize (params) {
    this.request = params.request;
    this.render();

    this.model = new Comment();
  },

  render () {
    this.$el.html(this.template());
  },

  submitClicked (evt) {
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

  afterSubmit () {
    $('body').removeClass('loading');
    this.model = new Comment();
    this.render();
    new Alert({
      type: 'success',
      body: 'Comment Submitted'
    });
  }

});

export default CreateCommentView;
