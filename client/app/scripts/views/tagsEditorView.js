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
    const $input = this.$('[data-attr="tags"]');
    const val = $input.val();
    // comma, enter, tab
    if (val && _.contains(this.delimiterKeycodes, evt.which)) {
      evt.preventDefault();
      $input.val('').focus();
      this.addTag(val);
    }
  },

  tagsBlur (evt) {
    let $input = this.$('[data-attr="tags"]');
    this.addTag($input.val());
    $input.val('');
  },

  addTag (tag) {
    tag = tag.trim();
    if (tag.length) { // tag contains more than just whitespace
      this.collection.add(new Tag({ name: tag }));
    }
  }

});

export default TagsEditorView;
