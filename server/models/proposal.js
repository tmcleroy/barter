'use strict';

var utils = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var Proposal = sequelize.define('Proposal', {
    body: DataTypes.TEXT,
    offer: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
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
