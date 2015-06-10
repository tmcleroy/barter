var middle = function requireAuth(req, res, next) {
  if (req.isAuthenticated()) { // if user is authenticated in the session, carry on
    return next();
  } else {
    res.status(401).send('Sorry, you do not have the proper permissions to perform this request.');
    // res.redirect('/login');
  }
};

module.exports = middle;
