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
        console.log('tags ---------------------------------------');
        console.log(tags);
        request.setTags(tags).then(function () {
          res.status(200).send(request);
        });
      });
    });
  });

  function createTags (cb) {
    var promises = [];
    var tags = {};
    _.each(req.body.tags, function (tag) {
      tags[tag] = null;
      var promise = models.Tag.findOrCreate({ where: { name: tag }})
        .then(function (resultTags, created) {
          tags[tag] = resultTags[0];
        });
      promises.push(promise);
    });
    Sequelize.Promise.all(promises).then(function () {
      cb(_.values(tags));
    });
  }
};


module.exports = handler;
