var bsModal = require('../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal');

console.log(bsModal);


var ModalView = Backbone.View.extend({
  template: require('../../templates/ui/modal.ejs'),

  initialize: function (params) {
    this.$el = params.$el || $('<div />').appendTo($('body'));
    this.dismissable = params.dismissable || true;
    this.acceptable = params.acceptable || true;
    this.title = params.title || '';
    this.body = params.body || '';
    this.buttons = params.buttons || { accept: 'Okay', dismiss: 'Cancel' };
    this.classes = params.classes || '';

    this.render();
  },

  render: function () {
    this.$el
      .addClass('modal fade no-transition')
      .html(this.template({
        title: this.title,
        body: this.body,
        dismissable: this.dismissable,
        acceptable: this.acceptable,
        buttons: this.buttons,
        classes: this.classes
      }))
      .modal({
        show: true,
        backdrop: true
      });
  }
});

module.exports = ModalView;
