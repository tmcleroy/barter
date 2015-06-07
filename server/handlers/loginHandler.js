var handler = function (req, res, next) {
  res.status(200);
  res.send(req.user.toClientJSON());
};

module.exports = handler;
