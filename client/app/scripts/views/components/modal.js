require('../../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal');

const Modal = Backbone.View.extend({
  template: require('templates/components/modal.ejs'),

  events: {
    'click [data-action="modal-accept"]': 'onAccept',
    'click [data-action="modal-cancel"]': 'onCancel'
  },

  initialize: function (params) {
    this.options = _.defaults(params || {}, {
      $el: $('<div />').appendTo($('body')),
      dismissable: true,
      acceptable: true,
      cancelable: true,
      title: '',
      body: '',
      buttons: { accept: 'Okay', cancel: 'Cancel' },
      classes: ''
    });
    this.render();
  },

  render: function () {
    this.$el
      .addClass('modal fade no-transition')
      .attr('tabindex', -1) // need for esc to close modal
      .html(this.template(this.options))
      .modal({
        show: true,
        backdrop: true
      });
  },

  onAccept: function (evt) {
    this.close();
  },

  onCancel: function (evt) {
    this.close();
  },

  close: function () {
    this.$el.modal('hide');
  }
});

export default Modal;
