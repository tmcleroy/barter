var _ = require('lodash');
var Sequelize = require('sequelize');
var models = require('../../models');

var handler = function (req, res) {
  models.Request.create({
    title: req.body.title,
    body: req.body.body,
    offer: req.body.offer
  }).then(function (request) {
    request.setUser(req.user).then(function () {
      createTags(function (tags) {
        request.setTags(tags).then(function () {
          res.status(200).send(request);
        });
      });
    });
  });

  function createTags (cb) {
    var promises = [];
    var tags = [];
    _.each(req.body.tags, function (tag) {
      var promise = models.Tag.findOrCreate({ where: { name: tag }})
        .then(function (tags) {
          tags.push(tags[0]);
        });
      promises.push(promise);
    });
    Sequelize.Promise.all(promises).then(function () {
      cb(tags);
    });
  }
};


module.exports = handler;
