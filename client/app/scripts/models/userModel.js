var UserModel = Backbone.Model.extend({

  url: function () {
    return '/api/users/' + this.id;
  }
});

export default UserModel;
