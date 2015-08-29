import Submission from 'scripts/models/submissionModel';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';
import template from 'templates/submission/submission.ejs';

const SubmissionView = Backbone.View.extend({
  template,
  events: {
    'click [data-action^="state-"]': 'stateClicked'
  },

  views: [],
  mine: false,

  initialize (params) {
    this.model = new Submission({ id: params.id });

    this.model.fetch().done((Submission) => {
      this.mine = App.user.get('id') === Submission.UserId;
      this.render();
    });
  },

  render () {
    const user = this.model.get('User');
    const request = this.model.get('Request');
    this.$el.html(this.template({
      submission: this.model,
      state: this.model.getStateString(),
      stateFormatted: this.model.getStateStringFormatted(),
      submissionOwner: user.get('id') === App.user.get('id') ? 'your' : `${ user.get('username') }'s`,
      requestOwner: request.get('UserId') === App.user.get('id') ? 'your' : `${ request.get('User').get('username') }'s`
    }));
  },

  stateClicked (evt) {
    const state = $(evt.target).attr('data-action').split(/state-/)[1];

    new ConfirmationModal({
      title: 'Confirm Action',
      body: `Are you sure you want to ${ state.slice(0, -2) } this submission`,
      buttons: { accept: `Yes, ${ state.slice(0, -2) }`, cancel: 'Go Back' },
      onAccept: (evt) => {
        $('body').addClass('loading');
        this.model.setState(state).done((model) => {
          $('body').removeClass('loading');
          new Alert({
            type: { accepted: 'success', rejected: 'info' }[state],
            body: `Submission ${ state }`
          });
          App.Router.navigate('/app/requests/mine', true);
        });
      }
    });
  },

  remove () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

export default SubmissionView;
