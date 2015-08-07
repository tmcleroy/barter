
var helpers = {
  toggleTabs: function ($activeTab) {
    this.$('li[role="presentation"]').removeClass('active');
    this.$('.actionContainer').addClass('hidden');
    // add active class to parent so the container panel becomes visible
    $activeTab.addClass('active').parent().addClass('active');
  }
};

export default helpers;
