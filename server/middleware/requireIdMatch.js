module.exports = (req, res, next) => {
  req.user.hasAdminAccess((access) => {
    if (access || req.params.id == req.user.id) {
      return next();
    } else {
      res.status(403).send('you do not have the proper permissions to view or alter this user');
    }
  });
};
