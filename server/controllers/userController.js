var _ = require('lodash');
var models = require('../models');

var controller = {

  show: function (req, res) {
    models.User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'username', 'email', 'rep', 'avatar'],
      include: [ models.Skill, models.Permission ]
    }).then(function (user) {
      res.status(200).send(user.toJSON());
    });
  },

  index: function (req, res) {
    models.User.findAll({
      include: [ models.Permission, models.Skill ]
    }).then(function (users) {
      res.status(200).json(users);
    });
  },

  subscriptions: {
    get: function (req, res) {
      models.User.findOne({
        where: { id: req.user.id },
        include : [
          { model: models.Tag }
        ]
      }).then(function (user) {
        res.status(200).send(user.Tags || null);
      });
    },

    set: function (req, res) {
      models.User.findOne({
        where: { id: req.user.id }
      }).then(function (user) {
        // create tags if they don't exist, and get their ids
        models.Tag.createTagsFromArray(req.body.tags).then(function (tags) {
          user.setTags(tags).then(function () {
            res.status(200).send(user);
          });
          _.each(tags, function (tag) {
            tag.addUser(user);
          });
        });
      });
    }
  }

};

module.exports = controller;
