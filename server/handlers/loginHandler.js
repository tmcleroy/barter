var handler = function (req, res, next) {
  res.status(200);
  res.send(req.user.getClientJson());
};

module.exports = handler;
