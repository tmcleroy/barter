var UserModel = Backbone.Model.extend({
  getProfileUrl: function () {
    return '/api/users/' + this.id;
  }
});

module.exports = UserModel;
