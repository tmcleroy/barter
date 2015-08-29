import 'bootstrap-sass/assets/javascripts/bootstrap/modal';
import template from 'templates/components/modal.ejs';

const Modal = Backbone.View.extend({
  template,
  events: {
    'click [data-action="modal-accept"]': 'onAccept',
    'click [data-action="modal-cancel"]': 'onCancel'
  },

  initialize (params) {
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

  render () {
    this.$el
      .addClass('modal fade no-transition')
      .attr('tabindex', -1) // need for esc to close modal
      .html(this.template(this.options))
      .modal({
        show: true,
        backdrop: true
      });
  },

  onAccept (evt) {
    this.close();
  },

  onCancel (evt) {
    this.close();
  },

  close () {
    this.$el.modal('hide');
  }
});

export default Modal;
