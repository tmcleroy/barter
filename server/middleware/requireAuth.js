var middle = function requireAuth(req, res, next) {
  if (req.isAuthenticated()) { // if user is authenticated in the session, carry on
    return next();
  } else { // if not authenticated redirect to the home page
    res.redirect('/login');
  }
};

module.exports = middle;
