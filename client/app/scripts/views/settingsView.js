import TagsEditorView from 'scripts/views/tagsEditorView';
import TagsCollection from 'scripts/collections/tagsCollection';
import template from 'templates/settings.ejs';

const SettingsView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="subscribe"]': 'subscribe',
    // 'blur [data-attr="tags"]': 'tagsBlur'
  },

  initialize (params) {
    this.subscriptions = new TagsCollection();
    // this.subscribeDebounced = _.debounce(::this.subscribe, 2000);

    App.user.fetchSubscriptions().done(::this.subscriptions.reset);
    this.listenTo(this.subscriptions, 'reset', this.render);
  },

  render () {
    this.$el.html(this.template({
      user: this.model
    }));
    new TagsEditorView({
      collection: this.subscriptions,
      el: this.$('.tagsEditorContainer')
    });
  },

  subscribe (evt) {
    this.$el.addClass('loading');
    evt.preventDefault();
    _.delay(() => { // allow some time for stranded tags to be added to the collection
      var tags = _.map(this.subscriptions.models, model => model.toJSON().name);
      App.user.setSubscriptions(tags).done((data) => {
        this.$el.removeClass('loading');
      }, 100);
    });
  },

  // tagsBlur (evt) {
  //   console.log('tags blurrrrrrrrrr');
  //   this.subscribeDebounced(evt);
  // }
});

export default SettingsView;
