import Request from 'scripts/models/requestModel';
import Tags from 'scripts/collections/tagsCollection';
import TagsEditorView from 'scripts/views/tagsEditorView';
import BodyEditorView from 'scripts/views/bodyEditorView';
import FormValidationView from 'scripts/views/formValidationView';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';
import template from 'templates/request/createRequest.ejs';

const CreateRequestView = FormValidationView.extend({
  template,
  validations: {
    'title': {
      test: val => val.length >= 10,
      message: {
        body: 'Title must be at least 10 characters.'
      }
    },
    'offer': {
      test: val => (/^\d+$/).test(val),
      message: {
        body: 'Offer must be a whole number.'
      }
    },
    'body': {
      test: val => val.length >= 30,
      message: {
        body: 'Description must be at least 30 characters.'
      }
    }
  },

  initialize (params) {
    this.model = new Request();
    this.tags = new Tags();
    this.render();
  },

  render () {
    this.$el.html(this.template());
    new BodyEditorView({
      el: this.$('.bodyEditorContainer'),
      required: true
    });
    new TagsEditorView({
      collection: this.tags,
      el: this.$('.tagsEditorContainer')
    });
  },

  validFormSubmitted (evt) {
    evt.preventDefault();
    const title = this.$('[data-attr="title"]').val();
    const body = this.$('[data-attr="body"]').val();
    const offer = parseInt(this.$('[data-attr="offer"]').val(), 10);


    new ConfirmationModal({
      title: 'Confirm Request',
      body: `By submitting this request you are committing to offer <span class="offer">${ offer }ę</span> in exchange for its completion.`,
      onAccept: (evt) => {
        $('body').addClass('loading');

        this.model.set({
          title: title,
          body: body,
          offer: offer,
          tags: _.map(this.tags.models, model => model.toJSON().name )
        });
        this.model.save().done((model) => {
          $('body').removeClass('loading');
          App.Router.navigate(`/app/requests/show/${ model.id }`, true);
          new Alert({
            type: 'success',
            body: 'Request Created'
          });
        });
      }
    });
  }
});

export default CreateRequestView;
