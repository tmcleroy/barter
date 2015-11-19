module.exports = (req, res) => {
  // server the html that loads the client app
  res.render('index.html.ejs', {
    user: JSON.stringify((req.user && req.user.toJSON()) || null)
  });
};
