import Tag from 'scripts/models/tagModel';
import TagsView from 'scripts/views/tagsView';
import template from 'templates/tag/tagsEditor.ejs';

const TagsEditorView = Backbone.View.extend({
  template,
  events: {
    'keydown [data-attr="tags"]': 'tagsKeydown'
  },

  delimiterKeycodes: [188, 13, 9],

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
    new TagsView({
      collection: this.collection,
      el: this.$('.tagsContainer'),
      editable: true,
      classes: 'simple'
    });
  },

  tagsKeydown (evt) {
    // comma, enter, tab
    if (_.contains(this.delimiterKeycodes, evt.which)) {
      evt.preventDefault();
      const tag = this.$('[data-attr="tags"]').val().trim();
      if (tag.length > 1) { // tag contains more than just whitespace
        this.$('[data-attr="tags"]').val('').focus();
        this.collection.add(new Tag({ name: tag }));
      }
    }
  }

});

export default TagsEditorView;
