var _ = require('lodash');
var Promise = require('bluebird');

module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // a tag can belong to many requests
        Tag.belongsToMany(models.Request, { through: 'TagRequest' });
        Tag.belongsToMany(models.User, { through: 'SubscribedUsers' });
      },
      createTagsFromArray: function (tags) {
        return new Promise(function (resolve, reject) {
          var promises = [];
          var createdTags = {};
          _.each(tags, function (tag) {
            createdTags[tag] = null;
            var promise = Tag.findOrCreate({ where: { name: tag }})
              .then(function (resultTags, created) {
                createdTags[tag] = resultTags[0];
              });
            promises.push(promise);
          });
          Promise.all(promises).then(function () {
            resolve(_.values(createdTags));
          });
        });
      }
    },
    instanceMethods: {
    }
  });
  return Tag;
};
