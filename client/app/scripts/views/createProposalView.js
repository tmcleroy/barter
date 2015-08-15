import Proposal from 'scripts/models/proposalModel';
import FormValidationView from 'scripts/views/formValidationView';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';
import template from 'templates/comment/createProposal.ejs';

const CreateProposalView = FormValidationView.extend({
  template,
  validations: {
    'body': {
      test: val => val.length >= 5,
      message: {
        body: 'Description must be at least 5 characters.'
      }
    },
    'offer': {
      test: val => (/^\d+$/).test(val),
      message: {
        body: 'Offer must be a whole number.'
      }
    }
  },

  initialize (params) {
    this.request = params.request;
    this.render();

    this.model = new Proposal();
  },

  render () {
    this.$el.html(this.template());
  },

  validFormSubmitted (evt) {
    evt.preventDefault();
    const offer = parseInt(this.$('[data-attr="offer"]').val(), 10);
    const body = this.$('[data-attr="body"]').val();

    new ConfirmationModal({
      title: 'Confirm Proposal',
      body: `By submitting this proposal, you are committing to fulfill this request in exchange for <span class="offer">${ offer }ę</span>`,
      onAccept: (evt) => {
        $('body').addClass('loading');

        this.model.set({
          body: body,
          offer: offer,
          requestId: this.request.get('id')
        });
        this.model.save().done((proposal) => {
          this.collection.add(proposal);
          this.afterSubmit();
        });
      }
    });
  },

  afterSubmit () {
    $('body').removeClass('loading');
    this.model = new Proposal();
    this.render();
    new Alert({
      type: 'success',
      body: 'Proposal Submitted'
    });
  }

});

export default CreateProposalView;
