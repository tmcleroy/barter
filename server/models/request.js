'use strict';

var utils = require('../utils');

module.exports = function (sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    title: DataTypes.STRING,
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
        // request has one user
        Request.belongsTo(models.User);
        // a request can have many tags, a tag can belong to many requests
        Request.belongsToMany(models.Tag, { through: 'RequestTag' });
        // a request can have many comments, a comment can belong to one request
        Request.hasMany(models.Comment);
        // a request can have many proposals, a proposal can belong to one request
        Request.hasMany(models.Proposal);
      }
    },
    instanceMethods: {
    }
  });
  return Request;
};
