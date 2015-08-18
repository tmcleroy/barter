import TagsEditorView from 'scripts/views/tagsEditorView';
import TagsCollection from 'scripts/collections/tagsCollection';
import template from 'templates/settings.ejs';

const SettingsView = Backbone.View.extend({
  template,

  events: {
    'click [data-action="subscribe"]': 'subscribe'
  },

  initialize (params) {
    // this.render();
    App.user.fetchSubscriptions().done((data) => {
      console.log('data from fetchSubscriptions', data);
      this.subscriptions = new TagsCollection(data);
      this.render();
    });
  },

  render () {
    console.log('subs', this.subscriptions);
    this.$el.html(this.template({
      user: this.model
    }));
    new TagsEditorView({
      collection: this.subscriptions,
      el: this.$('.tagsEditorContainer')
    });
  },

  subscribe (evt) {
    evt.preventDefault();
    var tags = _.map(this.subscriptions.models, model => model.toJSON().name);
    App.user.setSubscriptions(tags).done((data) => {
      console.log('set tags', data);
    });
  }
});

export default SettingsView;
