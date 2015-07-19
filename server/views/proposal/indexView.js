var models = require('../../models');

var sorts = { // sorts that can be on the query
  default: 'createdAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title',
  offer: 'offer'
};

var handler = function (req, res) {
  var limit = req.query.limit || 10;
  var cursor = req.query.cursor || 0;
  var sort = sorts.default;
  var order = 'desc';
  if (sorts[req.query.sort]) {
    order = req.query.sort.charAt(0) === '-' ? 'desc' : 'asc';
    sort = req.query.sort.replace(/^-/, '');
  }
  var sortOrder = [['"' + sort + '"', order]];

  models.Proposal.findAndCountAll({
    where: req.query.mine ? { UserId: req.user.id } : true,
    include: [
      {
        model: models.Request,
        include: [models.User]
      },
      {
        model: models.Submission
      }
    ],
    order: sortOrder,
    limit: limit,
    offset: cursor
  }).then(function (proposals) {
    res.status(200).json({
      items: proposals.rows,
      total: proposals.count
    });
  });
};

module.exports = handler;
