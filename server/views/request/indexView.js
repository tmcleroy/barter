var models = require('../../models');

var sorts = { // sorts that can be on the query
  default: 'createdAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title',
  offer: 'offer'
};

var postSorts = { // sorts that must happen after the query
  'numProposals': function (a, b) {
    return a.Proposals.length - b.Proposals.length;
  },
  '-numProposals': function (a, b) {
    return b.Proposals.length - a.Proposals.length;
  }
};

var handler = function (req, res) {
  var limit = req.query.limit || 10;
  var cursor = req.query.cursor || 0;
  var sort = sorts.default;
  var order = 'desc';
  if (sorts[req.query.sort]) {
    sort = req.query.sort.replace(/^-/, '');
    order = req.query.sort.charAt(0) === '-' ? 'desc' : 'asc';
  }
  // yes the double quotes are necessary https://github.com/sequelize/sequelize/issues/2495#issuecomment-75520604
  var sortOrder = '"' + sort + '"' + ' ' + order;

  models.Request.findAndCountAll({
    where: req.query.mine ? { UserId: req.user.id } : true,
    include: [models.User, models.Tag, models.Proposal],
    order: sortOrder,
    limit: limit,
    offset: cursor
  }).then(function (requests) {
    if (postSorts[req.query.sort]) {
      requests.rows.sort(postSorts[req.query.sort]);
    }
    res.status(200).json(requests.rows);
  });
};

module.exports = handler;
