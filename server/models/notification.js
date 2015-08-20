module.exports = function (sequelize, DataTypes) {
  // example notification as a sentence:
  // "Hey Tommy, Bill commented on your request"
  // actionType => 'Comment'
  // actionId => The id of the comment
  // User => Tommy's User instance
  // SubjectUser => Bill's User instance
  // ObjectRequest => The intance of that request (ObjectUser, ObjectProposal, etc. will be null)
  // objectType => 'Request'
  var Notification = sequelize.define('Notification', {
    actionType: DataTypes.STRING,
    actionId: DataTypes.INTEGER,
    // name of the model type of the object. User, Proposal, Request, etc.
    // needed so we can easily know which object type is set (see associations below)
    objectType: DataTypes.STRING,
    state: {
      type: DataTypes.INTEGER,
      defaultValue: -1 // unseen
    }
  }, {
    defaultScope: {
      where: {
        state: -1 // unseen
      }
    },
    classMethods: {
      associate: function (models) {
        // the user concerned with the notification (Tommy in the above example)
        Notification.belongsTo(models.User, { as: 'User' });
        // the user who performed the action that triggered the notification (Bill in the above example)
        Notification.belongsTo(models.User, { as: 'SubjectUser' });

        // each notification can have only one of these set
        // objectType should match the type of whichever one of these is set
        Notification.belongsTo(models.User, { as: 'ObjectUser' });
        Notification.belongsTo(models.Comment, { as: 'ObjectComment' });
        Notification.belongsTo(models.Proposal, { as: 'ObjectProposal' });
        Notification.belongsTo(models.Request, { as: 'ObjectRequest' });
        Notification.belongsTo(models.Submission, { as: 'ObjectSubmission' });
        Notification.belongsTo(models.Tag, { as: 'ObjectTag' });
        // if you add an Object* entry above, make sure to include it in the
        // notication indexView `views/notification/indexView.js` if you want the model to be sent to the client
      }
    },
    instanceMethods: {
    }
  });
  return Notification;
};
