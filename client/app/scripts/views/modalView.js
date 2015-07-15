var bsModal = require('../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal');

console.log(bsModal);


var ModalView = Backbone.View.extend({
  template: require('../../templates/ui/modal.ejs'),

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
      classes: '',
      onAccept: function (evt) { /* ... */ },
      onCancel: function (evt) { /* ... */ }
    });

    this.render();
  },

  render: function () {
    this.$el
      .addClass('modal fade no-transition')
      .html(this.template(this.options))
      .modal({
        show: true,
        backdrop: true
      });
  },

  onAccept: function (evt) {
    this.options.onAccept(evt);
    this.close();
  },

  onCancel: function (evt) {
    this.options.onCancel(evt);
    this.close();
  },

  close: function () {
    this.$el.modal('hide');
  }
});

module.exports = ModalView;
