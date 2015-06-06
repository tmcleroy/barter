var middle = function requireAuth(req, res, next) {
  req.user.hasAdminAccess(function (access) {
    if (access) {
      return next();
    } else {
      res.redirect('/login');
    }
  });
};

module.exports = middle;
