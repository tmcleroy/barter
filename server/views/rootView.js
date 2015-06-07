var handler = function (req, res) {
  res.render('index.html.ejs', {
    user: JSON.stringify((req.user && req.user.toClientJSON()) || null)
  });
};

module.exports = handler;
