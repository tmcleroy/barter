import template from 'templates/components/alert.ejs';

const Alert = Backbone.View.extend({
  template,
  initialize (params) {
    this.$el = $('<div />').appendTo($('#alertContainer'));
    this.options = _.defaults(params || {}, {
      type: 'info',
      dismissable: true,
      delay: 5,
      body: '',
      classes: ''
    });
    this.render();

    setTimeout(() => {
      this.close();
    }, this.options.delay * 1000);

    // handler must be set here, not in the events hash. I have no idea why
    this.$el.on('click', '.close', ::this.close);
  },

  render () {
    this.$el.html(this.template(this.options));
  },

  close () {
    this.$el.remove();
  }

});

export default Alert;
