var models = require('../../models');

var sorts = {
  default: 'createdAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title',
  offer: 'offer'
};

var handler = function (req, res) {
  var sort = sorts.default;
  var order = 'desc';
  if (req.query.sort) {
    sort = req.query.sort.replace(/^-/, '');
    order = req.query.sort.charAt(0) === '-' ? 'desc' : 'asc';
  }
  models.Request.findAll({
    include: [models.User, models.Tag, models.Comment, models.Proposal],
    order: '"' + sort + '"' + ' ' + order // yes the double quotes are necessary https://github.com/sequelize/sequelize/issues/2495#issuecomment-75520604
  }).then(function (requests) {
    res.status(200).json(requests);
  });
};

module.exports = handler;
