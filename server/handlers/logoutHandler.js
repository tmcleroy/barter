var handler = function (req, res) {
    req.logout();
    res.status(200);
    res.send('logged out');
};

module.exports = handler;
