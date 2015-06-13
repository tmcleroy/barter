var models = require('../../models');

var handler = function (req, res) {
  models.Comment.create({
    body: req.body.body
  }).then(function (comment) {
    comment.setUser(req.user);
    models.Request.findOne({ where: { id: req.body.requestId }})
      .then(function (request) {
        comment.setRequest(request);
        res.status(200).send(comment);
      });
  });
};

module.exports = handler;
