'use strict';

module.exports = function (sequelize, DataTypes) {
  var Proposal = sequelize.define('Proposal', {
    body: DataTypes.TEXT,
    offer: {
      type: DataTypes.INTEGER,
      set: function (val) {
        this.setDataValue('offer', parseInt(val, 10));
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Proposal.belongsTo(models.User);
        Proposal.belongsTo(models.Request);
        Proposal.hasMany(models.Comment);
      }
    },
    instanceMethods: {
    }
  });
  return Proposal;
};
