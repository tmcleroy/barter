var models = require('../../models');

var handler = function (req, res) {
  models.Request.create({
    title: req.body.title,
    body: req.body.body,
    offer: req.body.offer
  }).then(function (request) {
    request.setUser(req.user).then(function (request) {
      // request.setTags([/* tags from req body */]).then(function () { });
      res.status(200).send(request);
    });
  });
};

module.exports = handler;
