var models = require('../../models');

var handler = function (req, res) {
  models.Request.findAll({
    include: [models.Tag, models.Comment]
  }).then(function (requests) {
    res.json(200, requests);
  });
};

module.exports = handler;
