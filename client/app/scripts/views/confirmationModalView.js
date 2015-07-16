var ModalView = require('./modalView');

var ConfirmationModalView = ModalView.extend({
  initialize: function (params) {

    this._onAccept = params.onAccept;

    ModalView.prototype.initialize.call(this, _.extend({
      title: 'Confirm Request',
      body: 'By submitting this request you are committing to offer <span class="offer">' + this.$('[data-attr="offer"]').val() + 'ę</span> in exchange for its completion.',
      buttons: { accept: 'I Understand', cancel: 'Go Back' },
      dismissable: false
    }, params));
  },

  onAccept: function (evt) {
    this._onAccept();
    ModalView.prototype.onAccept.call(this, arguments);
  }
});

module.exports = ConfirmationModalView;
