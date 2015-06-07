var middle = function requireAuth(req, res, next) {
  req.user.hasAdminAccess(function (access) {
    if (access || req.params.id == req.user.id) {
      return next();
    } else {
      res.status(401);
      res.send('you do not have the proper permissions to view or alter this user');
    }
  });
};

module.exports = middle;
