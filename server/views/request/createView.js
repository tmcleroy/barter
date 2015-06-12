var models = require('../../models');

var handler = function (req, res) {
  console.log(req);
  models.Request.create({
    title: req.body.title,
    body: req.body.body
  }).then(function (request) {
    request.setUser(req.user);
    // request.setTags([/* tags from req body */]).then(function () { });
    res.status(200).send(request);
  });
};

module.exports = handler;
