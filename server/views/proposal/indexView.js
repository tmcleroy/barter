var models = require('../../models');
var Sortable = require('../../helpers/sortable');

var handler = function (req, res) {
  var sortable = new Sortable(req.query);
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
    order: sortable.querySort,
    limit: sortable.limit,
    offset: sortable.cursor
  }).then(function (proposals) {
    res.status(200).json({
      items: proposals.rows,
      total: proposals.count
    });
  });
};

module.exports = handler;
