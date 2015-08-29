// the extending view should implement the `tabChanged` function
// `tabChanged` is called with the `data-action` value of the clicked tab
// see createProposalAndCommentView
const TabbedView = Backbone.View.extend({
  events: {
    'click ul.nav-tabs a[data-action]': 'tabClicked'
  },

  // this function takes care of toggling the active states of the tabs.
  // it then calls `tabChanged` with the `data-action` value of the clicked tab
  tabClicked (evt) {
    evt.preventDefault();
    const $clickedTab = $(evt.target).closest('li[role="presentation"]');
    if (!$clickedTab.hasClass('active')) {
      this.$('li[role="presentation"]').removeClass('active');
      // add active class to parent so the container panel becomes visible
      $clickedTab.addClass('active').parent().addClass('active');
      this.tabChanged($(evt.target).attr('data-action'));
    }
  }
});

export default TabbedView;
