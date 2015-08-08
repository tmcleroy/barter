import TabHelper from '../helpers/_tabHelper';
import marked from 'marked';

const BodyEditorView = Backbone.View.extend(_.extend(TabHelper, {
  template: require('templates/bodyEditor.ejs'),

  events: {
    'click [data-action="write"]': 'toggleWrite',
    'click [data-action="preview"]': 'togglePreview'
  },

  initialize: function (params) {
    this.required = params.required;
    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      required: this.required
    }));
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

// // good way to handle event hash inheritance
// // idea = require(http://danhough.com/blog/backbone-view-inheritance/
// BodyEditorView.extend = function (child) {
//   var view = Backbone.View.extend.apply(this, arguments);
//   view.prototype.events = _.extend({}, this.prototype.events, child.events);
//   return view;
// };

export default BodyEditorView;
