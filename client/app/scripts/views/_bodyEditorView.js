var TabHelper = require('../helpers/_tabHelper');
var marked = require('marked');

var BodyEditorView = Backbone.View.extend(_.extend(TabHelper, {
  events: {
    'click [data-action="write"]': 'toggleWrite',
    'click [data-action="preview"]': 'togglePreview'
  },

  toggleWrite: function (evt) {
    evt.preventDefault();
    var $target = $(evt.target).closest('li[role="presentation"]');
    if (!$target.hasClass('active')) {
      this.toggleTabs($target);
      this.$('.writeContainer').toggleClass('hidden');
    }
  },

  togglePreview: function (evt) {
    console.log('toggle preview');
    evt.preventDefault();
    var $target = $(evt.target).closest('li[role="presentation"]');
    if (!$target.hasClass('active')) {
      this.toggleTabs($target);
      this.$('.previewContainer').toggleClass('hidden');
      var html = marked(this.$('[data-attr="body"]').val());
      this.$('.markdown').html(html);
    }
  }

}));

// good way to handle event hash inheritance
// idea from http://danhough.com/blog/backbone-view-inheritance/
BodyEditorView.extend = function (child) {
  var view = Backbone.View.extend.apply(this, arguments);
  view.prototype.events = _.extend({}, this.prototype.events, child.events);
  return view;
};

module.exports = BodyEditorView;
