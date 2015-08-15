'use strict';

module.exports = function (sequelize, DataTypes) {
  var Submission = sequelize.define('Submission', {
    body: DataTypes.TEXT,
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { isInt: true }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Submission.belongsTo(models.User);
        Submission.belongsTo(models.Request);
        Submission.belongsTo(models.Proposal);
        Submission.hasMany(models.Comment);
      }
    },
    instanceMethods: {
    }
  });
  return Submission;
};
