import Tag from 'scripts/models/tagModel';
import TagsView from 'scripts/views/tagsView';
import template from 'templates/tag/tagsEditor.ejs';

const TagsEditorView = Backbone.View.extend({
  template,
  events: {
    'keydown [data-attr="tags"]': 'tagsKeydown',
    'blur [data-attr="tags"]': 'tagsBlur'
  },

  delimiterKeycodes: [188, 13, 9],
  addOnBlur: true,

  initialize (params) {
    this.render();
    this.addOnBlur = params.addOnBlur || true;
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
      this.addTag(this.$('[data-attr="tags"]').val(), true);
    }
  },

  tagsBlur (evt) {
    if (this.addOnBlur) {
      this.addTag(this.$('[data-attr="tags"]').val());
    }
  },

  addTag (tag, refocus) {
    tag = tag.trim();
    let $input = this.$('[data-attr="tags"]');
    if (tag.length > 1) { // tag contains more than just whitespace
      this.collection.add(new Tag({ name: tag }));
      $input.val('');
      if (refocus) { $input.focus(); }
    }
  }

});

export default TagsEditorView;
