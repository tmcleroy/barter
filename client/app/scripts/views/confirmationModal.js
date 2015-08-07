import Modal from './components/modal';

var ConfirmationModal = Modal.extend({
  initialize: function (params) {

    this._onAccept = params.onAccept;

    Modal.prototype.initialize.call(this, _.extend({
      title: 'Confirm Request',
      body: 'By submitting this request you are committing to offer <span class="offer">' + this.$('[data-attr="offer"]').val() + 'ę</span> in exchange for its completion.',
      buttons: { accept: 'I Understand', cancel: 'Go Back' },
      dismissable: false
    }, params));
  },

  onAccept: function (evt) {
    this._onAccept();
    Modal.prototype.onAccept.call(this, arguments);
  }
});

export default ConfirmationModal;
