'use strict';

module.exports = function (sequelize, DataTypes) {
  var Proposal = sequelize.define('Proposal', {
    body: DataTypes.TEXT,
    offer: {
      type: DataTypes.INTEGER,
      validate: { isInt: true },
      set: function (val) {
        this.setDataValue('offer', parseInt(val, 10));
      }
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { isInt: true }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Proposal.belongsTo(models.User);
        Proposal.belongsTo(models.Request);
        Proposal.hasMany(models.Comment);
        Proposal.hasOne(models.Submission);
      }
    },
    instanceMethods: {
    }
  });
  return Proposal;
};
