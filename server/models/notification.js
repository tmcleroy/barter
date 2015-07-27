module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    // example notification as a sentence:
    // "Hey Tommy, Bill commented on your request"
    // User => Tommy's User instance
    // SubjectUser => Bill's User instance
    // predicate => 'commented on'
    // objectType => 'Request'
    // objectId => The ID of that particular request
    predicate: DataTypes.STRING,
    objectType: DataTypes.STRING, // name of the model. User, Proposal, Request, etc.
    objectId: DataTypes.INTEGER // id of ^
  }, {
    classMethods: {
      associate: function (models) {
        Notification.belongsTo(models.User, { as: 'SubjectUser' });
        // the user concerned with the notification (Tommy in the above example)
        Notification.belongsTo(models.User);
      }
    },
    instanceMethods: {
    }
  });
  return Notification;
};
