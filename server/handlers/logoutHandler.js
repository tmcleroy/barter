var handler = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = handler;
