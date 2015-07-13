var models = require('../../models');

var sorts = {
  default: 'createdAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title',
  offer: 'offer'
};

var postSorts = {
  'numProposals': function (a, b) {
    return a.Proposals.length - b.Proposals.length;
  },
  '-numProposals': function (a, b) {
    return b.Proposals.length - a.Proposals.length;
  }
};

var handler = function (req, res) {
  var sort = sorts.default;
  var order = 'desc';
  if (sorts[req.query.sort]) {
    sort = req.query.sort.replace(/^-/, '');
    order = req.query.sort.charAt(0) === '-' ? 'desc' : 'asc';
  }
  // yes the double quotes are necessary https://github.com/sequelize/sequelize/issues/2495#issuecomment-75520604
  var sortOrder = '"' + sort + '"' + ' ' + order;
  models.Request.findAll({
    include: [models.User, models.Tag, models.Proposal],
    order: sortOrder
  }).then(function (requests) {
    if (postSorts[req.query.sort]) {
      requests.sort(postSorts[req.query.sort]);
    }
    res.status(200).json(requests);
  });
};

module.exports = handler;
