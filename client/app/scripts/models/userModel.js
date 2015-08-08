const UserModel = Backbone.Model.extend({
  getProfileUrl: function () {
    return '/api/users/' + this.id;
  }
});

export default UserModel;
