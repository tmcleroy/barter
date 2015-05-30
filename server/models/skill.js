'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Skill.belongsTo(models.User);
      }
    }
  });
  return Skill;
};
