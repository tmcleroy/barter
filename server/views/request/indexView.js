var _ = require('lodash');
var models = require('../../models');
var Sortable = require('../../helpers/sortable');

var handler = function (req, res) {
  var sortable = new Sortable(_.extend({}, req.query, {
    sorts: {
      default: 'createdAt',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      title: 'title',
      offer: 'offer'
    }
  }));
  models.Request.findAndCountAll({
    where: req.query.mine ? { UserId: req.user.id } : true,
    include: [
      { model: models.User },
      { model: models.Tag },
      { model: models.Proposal }
    ],
    order: sortable.querySort,
    // we need a way to not set limit and offset when a postSort is defined so we get the whole dataset to sort
    limit: sortable.limit,
    offset: sortable.cursor
  }).then(function (requests) {
    res.status(200).json({
      items: requests.rows,
      total: requests.count
    });
  });
};

module.exports = handler;
