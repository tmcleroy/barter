var handler = function (req, res, next) {
  res.status(200).send(req.user.toJSON());
};

module.exports = handler;
