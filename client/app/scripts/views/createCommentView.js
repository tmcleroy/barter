import Comment from 'scripts/models/commentModel';
import FormValidationView from 'scripts/views/formValidationView';
import Alert from './components/alert';
import template from 'templates/comment/createComment.ejs';

const CreateCommentView = FormValidationView.extend({
  template,
  validations: {
    'body': {
      test: val => val.length >= 5,
      message: {
        body: 'Description must be at least 5 characters.'
      }
    }
  },

  initialize (params) {
    this.request = params.request;
    this.render();

    this.model = new Comment();
  },

  render () {
    this.$el.html(this.template());
  },

  validFormSubmitted (evt) {
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
