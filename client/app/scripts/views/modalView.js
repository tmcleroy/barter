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

    this.render();
  },

  render: function () {
    this.$el
      .addClass('modal fade')
      .html(this.template({
        title: this.title,
        body: this.body,
        dismissable: this.dismissable,
        acceptable: this.acceptable,
        buttons: this.buttons
      }))
      .modal({show: true, backdrop: 'static', keyboard: false});
  }
});

module.exports = ModalView;
