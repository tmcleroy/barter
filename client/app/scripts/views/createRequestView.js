import Request from 'scripts/models/requestModel';
import Tags from 'scripts/collections/tagsCollection';
import Tag from 'scripts/models/tagModel';
import TagsView from 'scripts/views/tagsView';
import BodyEditorView from 'scripts/views/bodyEditorView';
import FormValidationView from 'scripts/views/formValidationView';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';
import template from 'templates/request/createRequest.ejs';

const CreateRequestView = FormValidationView.extend({
  template,
  events: _.extend({}, FormValidationView.prototype.events, {
    'keydown [data-attr="tags"]': 'tagsKeydown'
  }),

  validations: {
    'title': {
      test: val => val.length > 10,
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
      test: val => val.length > 50,
      message: {
        body: 'Description must be at least 50 characters.'
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
    new TagsView({
      collection: this.tags,
      el: this.$('.tagsContainer'),
      editable: true,
      classes: 'simple'
    });
  },

  validFormSubmitted (evt) {
    evt.preventDefault();

    new ConfirmationModal({
      title: 'Confirm Request',
      body: `By submitting this request you are committing to offer <span class="offer">${ this.$('[data-attr="offer"]').val() }ę</span> in exchange for its completion.`,
      onAccept: (evt) => {
        $('body').addClass('loading');
        var title = this.$('[data-attr="title"]').val();
        var body = this.$('[data-attr="body"]').val();
        var offer = this.$('[data-attr="offer"]').val();

        this.model.set({
          title: title,
          body: body,
          offer: offer,
          tags: _.map(this.tags.models, function (model) { return model.toJSON().name; })
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
  },

  tagsKeydown (evt) {
    // comma, enter, tab
    if (_.contains([188, 13, 9], evt.which)) {
      evt.preventDefault();
      var tag = this.$('[data-attr="tags"]').val().trim();
      if (tag.length > 1) { // tag contains more than just whitespace
        this.$('[data-attr="tags"]').val('').focus();
        this.tags.add(new Tag({ name: tag }));
      }
    }
  }
});

export default CreateRequestView;
