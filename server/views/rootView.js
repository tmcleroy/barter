var handler = function (req, res) {
  res.render('index.html.ejs', {
    user: JSON.stringify((req.user && req.user.toJSON()) || null)
  });
};

module.exports = handler;
